using BookTracker.Api.Features.Books.Mappers;
using BookTracker.Api.Features.Books.Models;
using BookTracker.Api.Features.Books.Utils;
using BookTracker.Api.Infrastructure;
using Marten;
using Marten.Pagination;

namespace BookTracker.Api.Features.Books.Services;

public class BooksService(IDocumentSession session): IBooksService
{
    public async Task<PaginatedResponse<BookResponse>> HandleGetAll(
        BookFilters filterQuery, 
        CancellationToken token = default)
    {
        var query = session
            .Query<Book>()
            .Where(book => !book.IsDeleted)
            .ApplyFiltering(filterQuery);

        if (!string.IsNullOrEmpty(filterQuery.Search))
        {
            query = query.ApplySearch(filterQuery.Search);
        }
        
        if (!string.IsNullOrWhiteSpace(filterQuery.OrderBy))
        {
            query = query.OrderQuery(filterQuery.OrderBy);
        }

        var page = filterQuery.Page ??  1;
        var pageSize = filterQuery.PageSize ?? 10;
        
        var response = await query.ToPagedListAsync(
            page, 
            pageSize, 
            token);

        var books = response.Select(book => book.ToResponse());
        return new PaginatedResponse<BookResponse>
        {
            Items = books,
            TotalCount = response.TotalItemCount,
        };
    }

    public async Task<BookResponse?> HandleGetById(
        Guid id , CancellationToken token = default)
    {
        var book = await session.LoadAsync<Book>(id, token);
        if (book == null || book.IsDeleted)
        {
            return null;
        }

        return book.ToResponse();
    }


    public async Task<IList<BookHistoryResponse>> HandleGetHistory(
        Guid id, CancellationToken token = default)
    {
        var events = await session.Events.FetchStreamAsync(id, token: token);
        
        return events.Select(e =>
        {
            var details = e.Data switch
            {
                BookAdded @event => new { Change = @event.Title },
                TitleChanged @event => new { Change = @event.Title },
                DescriptionChanged @event => new { Change = @event.Description },
                AuthorAdded @event => new { Change = @event.Name },
                AuthorRemoved @event => new { Change = @event.Name },
                PublishDateChanged @event => new { Change = @event.Date.ToString() },
                _ => new object()
            };

            return new BookHistoryResponse
            {
                Type = e.Data.GetType().Name,
                ModifiedAt = e.Timestamp.DateTime,
                Details = details
            };
        }).ToList();
    }

    public async Task<Guid> HandleCreate(
        CreateBookRequest book, CancellationToken token = default)
    {
        var id = Guid.NewGuid();
        var @event = new BookAdded
        {
            Id = id,
            Title = book.Title,
            Description = book.Description,
            PublishDate = book.PublishDate,
            Authors = book.Authors,
        };

        session.Events.StartStream<Book>(id, @event);
        await session.SaveChangesAsync(token);

        return id;
    }

    public async Task<Guid> HandleUpdate(
        Guid bookId, 
        UpdateBookRequest book, 
        CancellationToken token = default)
    {
        var savedBook = await session.LoadAsync<Book>(bookId, token);
        if (savedBook == null)
        {
            throw new Exception("Book not found");
        }

        var events = savedBook.GenerateUpdateEvents(book);
        session.Events.Append(bookId, events);
        
        await session.SaveChangesAsync(token);
        return bookId;
    }

    public async Task<Guid> HandleDelete(Guid bookId, CancellationToken token = default)
    {
        var book = await session.LoadAsync<Book>(bookId, token);
        if (book == null)
        {
            throw new Exception("Book not found");
        }
        
        var @event = new BookDeleted(bookId);
        session.Events.Append(bookId, @event);
        
        await session.SaveChangesAsync(token);
        return bookId;
    }
}
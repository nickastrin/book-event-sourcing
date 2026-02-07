using BookTracker.Api.Features.Books.Mappers;
using BookTracker.Api.Features.Books.Models;
using BookTracker.Api.Infrastructure;
using Marten;
using Marten.Pagination;

namespace BookTracker.Api.Features.Books.Services;

public class BookService(IDocumentSession session): IBookService
{
    public async Task<PaginatedResponse<BookResponse>> HandleGetAll(
        string? search,
        int page = 1,
        int pageSize = 10)
    {
        var query = session
            .Query<Book>()
            .Where(book => !book.IsDeleted);

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(b => b.Title.Contains(
                search, StringComparison.OrdinalIgnoreCase));
        }

        var response = await query
            .ToPagedListAsync(page, pageSize);

        var books = response.Select(book => book.ToResponse());
        return new PaginatedResponse<BookResponse>
        {
            Items = books,
            TotalCount = response.TotalItemCount,
        };
    }

    public async Task<BookResponse?> HandleGetById(Guid id)
    {
        var book = await session.LoadAsync<Book>(id);
        if (book == null || book.IsDeleted)
        {
            return null;
        }

        return book.ToResponse();
    }

    public async Task<Guid> HandleCreate(CreateBookRequest book)
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
        await session.SaveChangesAsync();

        return id;
    }

    public async Task HandleUpdate(Guid bookId, UpdateBookRequest book)
    {
        var savedBook = await session.LoadAsync<Book>(bookId);
        if (savedBook == null)
        {
            throw new Exception("Book not found");
        }

        var events = savedBook.GenerateUpdateEvents(book);
        session.Events.Append(bookId, events);
        
        await session.SaveChangesAsync();
    }

    public async Task HandleDelete(Guid bookId)
    {
        var book = await session.LoadAsync<Book>(bookId);
        if (book == null)
        {
            return;
        }
        
        var @event = new BookDeleted(bookId);
        session.Events.Append(bookId, @event);
        
        await session.SaveChangesAsync();
    }
}
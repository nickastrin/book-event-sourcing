using BookTracker.Api.Features.Books.Models;

namespace BookTracker.Api.Features.Books.Utils;

public static class FilterHelper
{
    public static IQueryable<Book> ApplyFiltering(
        this IQueryable<Book> query, BookFilters filters)
    {
        if (filters.Authors.Count > 0)
        {
            query = query.Where(book => 
                book.Authors.Any(author => filters.Authors.Contains(author))
            );
        }

        if (filters.MinPublishDate != null)
        {
            query = query.Where(book => 
                book.PublishDate >= filters.MinPublishDate.Value);
        }

        if (filters.MaxPublishDate != null)
        {
            query = query.Where(book =>
                book.PublishDate <= filters.MaxPublishDate.Value);
        }

        return query;
    }
}
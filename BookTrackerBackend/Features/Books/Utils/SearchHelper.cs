using BookTracker.Api.Features.Books.Models;

namespace BookTracker.Api.Features.Books.Utils;

public static class SearchHelper
{
    public static IQueryable<Book> ApplySearch(this IQueryable<Book> query, string search)
    {
        if (string.IsNullOrEmpty(search))
        {
            return query;
        }
        
        return query.Where(b => 
            b.Title.Contains(search, StringComparison.CurrentCultureIgnoreCase) ||
            b.Description.Contains(search, StringComparison.CurrentCultureIgnoreCase));
    }
}
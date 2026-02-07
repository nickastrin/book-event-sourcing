using System.Linq.Expressions;
using BookTracker.Api.Features.Books.Models;

namespace BookTracker.Api.Features.Books.Utils;

public static class OrderHelper
{
    private static IQueryable<Book> ApplySort(
        this IQueryable<Book> query,
        Expression<Func<Book, object>> expression,
        bool isDescending)
    {
        return isDescending ? 
            query.OrderByDescending(expression) : 
            query.OrderBy(expression);
    }

    public static IQueryable<Book> OrderQuery(this IQueryable<Book> query, string orderBy)
    {
        var values = orderBy.Split(" ");
        var field = values[0].ToLower();
        var isDescending = values.Length > 1 && 
                           values[1].Equals("desc", StringComparison.CurrentCultureIgnoreCase);

        return field switch
        {
            "title" => query.ApplySort(x => x.Title.ToLower(), isDescending),
            "description" => query.ApplySort(x => x.Description.ToLower(), isDescending),
            "publishdate" => query.ApplySort(x => x.PublishDate, isDescending),
            _ => query.ApplySort(x => x.Title.ToLower(), isDescending)
        };
    }
}
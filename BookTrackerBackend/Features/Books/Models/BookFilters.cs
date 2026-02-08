using BookTracker.Api.Infrastructure;

namespace BookTracker.Api.Features.Books.Models;

public record BookFilters : FilterQuery
{
    public IList<string> Authors { get; init; } = new List<string>();
    public DateOnly? MinPublishDate { get; init; }
    public DateOnly? MaxPublishDate { get; init; }
}
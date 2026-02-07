using Gridify;

namespace BookTracker.Api.Infrastructure;

public class FilterQuery : GridifyQuery
{
    public string? Search { get; set; }
}
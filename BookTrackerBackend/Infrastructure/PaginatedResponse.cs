namespace BookTracker.Api.Infrastructure;

public class PaginatedResponse<T>
{
    public IEnumerable<T> Items { get; set; } = new List<T>();
    
    public long TotalCount { get; set;}
}
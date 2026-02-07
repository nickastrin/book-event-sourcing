namespace BookTracker.Api.Infrastructure;

public record FilterQuery
{
    public string? Search { get; set; }
    public int? Page { get; set; }
    public int? PageSize { get; set; }
    public string? OrderBy { get; set; }
}
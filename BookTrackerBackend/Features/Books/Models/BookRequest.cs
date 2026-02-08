namespace BookTracker.Api.Features.Books.Models;

public record CreateBookRequest
{
    public required string Title { get; set; }
    public string Description { get; set; } = string.Empty; 
    
    public List<string> Authors { get; set; } = [];
    public DateOnly? PublishDate { get; set; }
}

public record UpdateBookRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty; 
    
    public List<string> Authors { get; set; } = [];
    public DateOnly PublishDate { get; set; }
}
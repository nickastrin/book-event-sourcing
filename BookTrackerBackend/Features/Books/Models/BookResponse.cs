namespace BookTracker.Api.Features.Books.Models;

public class BookResponse
{
    public required string Title { get; set; }
    public string Description { get; set; } = string.Empty; 
    
    public List<string> Authors { get; set; } = [];
    public DateOnly PublishDate { get; set; }
}
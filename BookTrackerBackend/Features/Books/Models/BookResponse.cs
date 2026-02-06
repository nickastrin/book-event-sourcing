namespace BookTracker.Api.Features.Books.Models;

public record BookResponse
{
    public Guid Id { get; init; }
    public required string Title { get; set; }
    public string Description { get; set; } = string.Empty; 
    
    public List<string> Authors { get; set; } = [];
    public DateOnly PublishDate { get; set; }
}
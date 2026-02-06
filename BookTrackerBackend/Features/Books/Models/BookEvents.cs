namespace BookTracker.Api.Features.Books.Models;

public record BookAdded
{
    public Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Description { get; init; }
    public List<string> Authors { get; init; } = [];
    public DateOnly PublishDate { get; init; }
}
    
public record TitleChanged(Guid Id, string Title);
public record DescriptionChanged(Guid Id, string Description);
public record AuthorAdded(Guid Id, string Name);
public record AuthorRemoved(Guid Id, string Name);
public record PublishDateChanged(Guid Id, DateOnly Date);

public record BookDeleted(Guid Id);
    
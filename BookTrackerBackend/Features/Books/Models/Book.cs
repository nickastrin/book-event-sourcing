using JasperFx.Events;
namespace BookTracker.Api.Features.Books.Models;

public class Book
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string Description { get; set; } = string.Empty; 
    
    public List<string> Authors { get; set; } = [];
    public DateTime PublishDate { get; set; }

    public bool IsDeleted { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
    

    public void Apply(IEvent<BookAdded> @event)
    {
        var data =  @event.Data;
        var timestamp = @event.Timestamp;
        
        Id = data.Id;
        Title = data.Title;
        Description = data.Description ?? string.Empty;
        Authors = data.Authors;
        PublishDate = data.PublishDate;

        CreatedAt = timestamp.UtcDateTime;
        LastUpdatedAt = timestamp.UtcDateTime;
    }

    public void Apply(IEvent<TitleChanged> @event)
    {
        Title = @event.Data.Title;
        LastUpdatedAt = @event.Timestamp.UtcDateTime;
    }
    
    public void Apply(IEvent<DescriptionChanged> @event)
    {
        Description = @event.Data.Description;
        LastUpdatedAt = @event.Timestamp.UtcDateTime;
    }

    public void Apply(IEvent<AuthorAdded> @event)
    {
        Authors.Add(@event.Data.Name);
        LastUpdatedAt = @event.Timestamp.UtcDateTime;
    }

    public void Apply(IEvent<AuthorRemoved> @event)
    {
        Authors.Remove(@event.Data.Name);
        LastUpdatedAt = @event.Timestamp.UtcDateTime;
    }

    public void Apply(IEvent<PublishDateChanged> @event)
    {
        PublishDate = @event.Data.Date;
        LastUpdatedAt = @event.Timestamp.UtcDateTime;
    }

    public void Apply(IEvent<BookDeleted> @event)
    {
        IsDeleted = true;
        LastUpdatedAt = @event.Timestamp.UtcDateTime;
    }

    public IEnumerable<object> GenerateUpdateEvents(UpdateBookRequest request)
    {
        if (!string.IsNullOrEmpty(request.Title) || Title != request.Title)
        {
            var @event = new TitleChanged(Id, request.Title);
            yield return @event;
        }

        if (!string.IsNullOrEmpty(request.Description) || Description != request.Description)
        {
            var @event = new DescriptionChanged(Id, request.Description);
            yield return @event;
        }
        
        var removed = Authors.Except(request.Authors).ToList();
        if (removed.Count > 0)
        {
            foreach (var author in removed)
            {
                var @event = new AuthorRemoved(Id, author);
                yield return @event;
            }
        }
        
        var added  = Authors.Except(request.Authors).ToList();
        if (added.Count > 0) {
            foreach (var author in added)
            {
                var @event =  new AuthorAdded(Id, author);
                yield return @event;
            }
        }
    }
}
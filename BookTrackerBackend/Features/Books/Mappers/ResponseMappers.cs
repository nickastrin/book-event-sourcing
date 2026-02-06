using BookTracker.Api.Features.Books.Models;

namespace BookTracker.Api.Features.Books.Mappers;

public static class ResponseMappers
{
    public static BookResponse ToResponse(this Book book)
    {
        return new BookResponse
        {
            Id = book.Id,
            Title = book.Title,
            Description = book.Description,
            Authors = book.Authors,
            PublishDate = book.PublishDate,
        };
    }
}
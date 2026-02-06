using BookTracker.Api.Features.Books.Models;
using Marten.Pagination;

namespace BookTracker.Api.Features.Books.Services;

public interface IBookService
{
    public Task<IPagedList<Book>> HandleGetAll(
        string? search, int page, int pageNumber);
    public Task<Book?> HandleGetById(string id);
    public Task<Guid> HandleCreate(CreateBookRequest book);
    public Task HandleUpdate(Guid bookId, UpdateBookRequest book);
    public Task HandleDelete(Guid bookId);
}
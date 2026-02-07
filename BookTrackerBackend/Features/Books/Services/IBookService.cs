using BookTracker.Api.Features.Books.Models;
using BookTracker.Api.Infrastructure;
using Marten.Pagination;

namespace BookTracker.Api.Features.Books.Services;

public interface IBookService
{
    public Task<PaginatedResponse<BookResponse>> HandleGetAll(
        string? search, int page, int pageNumber);
    public Task<BookResponse?> HandleGetById(Guid id);
    public Task<IList<BookHistoryResponse>> HandleGetHistory(Guid id);
    public Task<Guid> HandleCreate(CreateBookRequest book);
    public Task HandleUpdate(Guid bookId, UpdateBookRequest book);
    public Task HandleDelete(Guid bookId);
}
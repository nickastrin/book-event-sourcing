using BookTracker.Api.Features.Books.Models;
using BookTracker.Api.Infrastructure;
using Marten.Pagination;

namespace BookTracker.Api.Features.Books.Services;

public interface IBooksService
{
    public Task<PaginatedResponse<BookResponse>> HandleGetAll(
        string? search, 
        int page, 
        int pageNumber, 
        CancellationToken token);
    public Task<BookResponse?> HandleGetById(
        Guid id, 
        CancellationToken token);
    public Task<IList<BookHistoryResponse>> HandleGetHistory(
        Guid id, 
        CancellationToken token);
    public Task<Guid> HandleCreate(
        CreateBookRequest book, 
        CancellationToken token);
    public Task<Guid> HandleUpdate(
        Guid bookId, 
        UpdateBookRequest book, 
        CancellationToken token);
    public Task<Guid> HandleDelete(Guid bookId, CancellationToken token);
}

using BookTracker.Api.Features.Books.Models;
using BookTracker.Api.Features.Books.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookTracker.Api.Features.Books.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController(IBooksService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<BookResponse>> GetAllBooks(
        [FromQuery] string? search, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10,
        CancellationToken token = default)
    {
        var result = await service.HandleGetAll(
            search, page, pageSize, token);
        
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookResponse>> GetBookById(Guid id, 
        CancellationToken token = default)
    {
        var result = await service.HandleGetById(id, token);

        if (result == null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }

    [HttpGet("{id}/history")]
    public async Task<ActionResult<IList<BookHistoryResponse>>> GetBookHistory(
        Guid id, 
        CancellationToken token = default)
    {
        var result = await service.HandleGetHistory(id, token);
        
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateBook(CreateBookRequest book,
        CancellationToken token = default)
    {
        var response =  await service.HandleCreate(book, token);
        return Ok(response);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult> UpdateBook(
        Guid id, 
        UpdateBookRequest book, 
        CancellationToken token = default)
    {
        var response = await service.HandleUpdate(id, book, token);
        return Ok(response);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteBook(Guid id, 
        CancellationToken token = default)
    {
        var response = await service.HandleDelete(id, token);
        return Ok(response);
    }
}
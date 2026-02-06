
using BookTracker.Api.Features.Books.Models;
using BookTracker.Api.Features.Books.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookTracker.Api.Features.Books.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController(IBookService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Book>> GetAllBooks(
        [FromQuery] string? search, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10)
    {
        var result = await service.HandleGetAll(
            search, page, pageSize);
        
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBookById(string id)
    {
        var result = await service.HandleGetById(id);

        if (result == null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }
}
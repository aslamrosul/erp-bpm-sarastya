using ERPBPM.Application.DTOs.Position;
using ERPBPM.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPBPM.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PositionsController : ControllerBase
{
    private readonly PositionService _positionService;

    public PositionsController(PositionService positionService)
    {
        _positionService = positionService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PositionDto>>> GetAll()
    {
        var positions = await _positionService.GetAllAsync();
        return Ok(positions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PositionDto>> GetById(Guid id)
    {
        var position = await _positionService.GetByIdAsync(id);
        if (position == null)
            return NotFound();

        return Ok(position);
    }

    [HttpPost]
    public async Task<ActionResult<PositionDto>> Create([FromBody] CreatePositionDto dto)
    {
        var position = await _positionService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = position.Id }, position);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PositionDto>> Update(Guid id, [FromBody] UpdatePositionDto dto)
    {
        try
        {
            var position = await _positionService.UpdateAsync(id, dto);
            return Ok(position);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _positionService.DeleteAsync(id);
        return NoContent();
    }
}

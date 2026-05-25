using ERPBPM.Application.DTOs.Department;
using ERPBPM.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPBPM.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly DepartmentService _departmentService;

    public DepartmentsController(DepartmentService departmentService)
    {
        _departmentService = departmentService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetAll()
    {
        var departments = await _departmentService.GetAllAsync();
        return Ok(departments);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DepartmentDto>> GetById(Guid id)
    {
        var department = await _departmentService.GetByIdAsync(id);
        if (department == null)
            return NotFound();

        return Ok(department);
    }

    [HttpPost]
    public async Task<ActionResult<DepartmentDto>> Create([FromBody] CreateDepartmentDto dto)
    {
        var department = await _departmentService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = department.Id }, department);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<DepartmentDto>> Update(Guid id, [FromBody] UpdateDepartmentDto dto)
    {
        try
        {
            var department = await _departmentService.UpdateAsync(id, dto);
            return Ok(department);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _departmentService.DeleteAsync(id);
        return NoContent();
    }
}

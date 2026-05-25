using ERPBPM.Application.DTOs.Task;
using ERPBPM.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ERPBPM.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<IActionResult> GetTasks([FromQuery] Guid? projectId, [FromQuery] Guid? assigneeId)
    {
        try
        {
            IEnumerable<TaskDto> tasks;

            if (projectId.HasValue)
            {
                tasks = await _taskService.GetTasksByProjectIdAsync(projectId.Value);
            }
            else if (assigneeId.HasValue)
            {
                tasks = await _taskService.GetTasksByAssigneeIdAsync(assigneeId.Value);
            }
            else
            {
                tasks = await _taskService.GetAllTasksAsync();
            }

            return Ok(tasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTask(Guid id)
    {
        try
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
                return NotFound(new { message = "Task not found" });

            return Ok(task);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
    {
        try
        {
            var task = await _taskService.CreateTaskAsync(dto);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(Guid id, [FromBody] UpdateTaskDto dto)
    {
        try
        {
            var task = await _taskService.UpdateTaskAsync(id, dto);
            return Ok(task);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(Guid id)
    {
        try
        {
            var result = await _taskService.DeleteTaskAsync(id);
            if (!result)
                return NotFound(new { message = "Task not found" });

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}

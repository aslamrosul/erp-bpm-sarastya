using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ERPBPM.Application.DTOs.Project;
using ERPBPM.Application.Services;
using System.Security.Claims;

namespace ERPBPM.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _projectService;

    public ProjectsController(ProjectService projectService)
    {
        _projectService = projectService;
    }

    /// <summary>
    /// Get all projects
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ProjectDto>), 200)]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _projectService.GetAllProjectsAsync();
        return Ok(projects);
    }

    /// <summary>
    /// Get project by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ProjectDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetProject(Guid id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null)
            return NotFound(new { message = "Project not found" });

        return Ok(project);
    }

    /// <summary>
    /// Create new project
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ProjectDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        try
        {
            var project = await _projectService.CreateProjectAsync(dto, userId);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update project
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(ProjectDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateProject(Guid id, [FromBody] UpdateProjectDto dto)
    {
        try
        {
            var project = await _projectService.UpdateProjectAsync(id, dto);
            return Ok(project);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Delete project
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> DeleteProject(Guid id)
    {
        var result = await _projectService.DeleteProjectAsync(id);
        if (!result)
            return NotFound(new { message = "Project not found" });

        return NoContent();
    }
}

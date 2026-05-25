using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERPBPM.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorkflowController : ControllerBase
{
    [HttpGet]
    public IActionResult GetWorkflows()
    {
        return Ok(new { message = "Workflows list" });
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ERPBPM.Infrastructure.Queries;

namespace ERPBPM.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly DashboardQueries _dashboardQueries;

    public DashboardController(DashboardQueries dashboardQueries)
    {
        _dashboardQueries = dashboardQueries;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var data = await _dashboardQueries.GetDashboardStatsAsync();
        return Ok(data);
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var data = await _dashboardQueries.GetDashboardStatsAsync();
        return Ok(data);
    }
}

using ERPBPM.Application.DTOs.Dashboard;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using TaskStatus = ERPBPM.Domain.Enums.TaskStatus;

namespace ERPBPM.Infrastructure.Queries;

public class DashboardQueries
{
    private readonly ApplicationDbContext _context;

    public DashboardQueries(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardDto> GetDashboardStatsAsync()
    {
        var totalUsers = await _context.Users.CountAsync();
        var totalProjects = await _context.Projects.CountAsync();
        var activeProjects = await _context.Projects.CountAsync(p => p.Status == "Active");
        
        var totalTasks = await _context.Tasks.CountAsync();
        var completedTasks = await _context.Tasks.CountAsync(t => t.Status == TaskStatus.Done);
        var pendingTasks = totalTasks - completedTasks;

        var projectStatus = await _context.Projects
            .GroupBy(p => p.Status)
            .Select(g => new ProjectStatusDto
            {
                Name = g.Key,
                Value = g.Count()
            })
            .ToListAsync();

        // Recent activities (last 10)
        var recentActivities = await _context.Tasks
            .Include(t => t.Assignee)
            .OrderByDescending(t => t.CreatedAt)
            .Take(10)
            .Select(t => new RecentActivityDto
            {
                Id = t.Id.ToString(),
                Type = "Task",
                Description = t.Title,
                Timestamp = t.CreatedAt,
                User = t.Assignee != null ? t.Assignee.Username : "Unassigned"
            })
            .ToListAsync();

        return new DashboardDto
        {
            TotalUsers = totalUsers,
            TotalProjects = totalProjects,
            ActiveProjects = activeProjects,
            TotalTasks = totalTasks,
            CompletedTasks = completedTasks,
            PendingTasks = pendingTasks,
            ProjectStatus = projectStatus,
            RecentActivities = recentActivities
        };
    }
}

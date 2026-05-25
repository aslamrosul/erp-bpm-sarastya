namespace ERPBPM.Application.DTOs.Dashboard;

public class DashboardDto
{
    public int TotalUsers { get; set; }
    public int TotalProjects { get; set; }
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int PendingTasks { get; set; }
    public int ActiveProjects { get; set; }
    public List<ProjectStatusDto> ProjectStatus { get; set; } = new();
    public List<RecentActivityDto> RecentActivities { get; set; } = new();
}

public class ProjectStatusDto
{
    public string Name { get; set; } = string.Empty;
    public int Value { get; set; }
}

public class RecentActivityDto
{
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string User { get; set; } = string.Empty;
}

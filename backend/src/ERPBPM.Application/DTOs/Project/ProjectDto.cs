namespace ERPBPM.Application.DTOs.Project;

public class ProjectDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string Status { get; set; } = string.Empty;

    // UI Figma
    public int Progress { get; set; }

    public decimal Budget { get; set; }

    public int TotalTasks { get; set; }

    public int CompletedTasks { get; set; }

    public int TeamCount { get; set; }

    // owner / creator
    public Guid OwnerId { get; set; }

    public string? OwnerName { get; set; }

    // manager
    public Guid? ManagerId { get; set; }

    public string? ManagerName { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
namespace ERPBPM.Application.DTOs.Project;

public class UpdateProjectDto
{
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string Status { get; set; } = "Active";

    // tambahan untuk UI
    public int Progress { get; set; }

    public decimal Budget { get; set; }

    public Guid? ManagerId { get; set; }
}
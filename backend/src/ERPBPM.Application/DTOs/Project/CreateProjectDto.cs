namespace ERPBPM.Application.DTOs.Project;

public class CreateProjectDto
{
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Status { get; set; }

    // tambahan untuk UI
    public int Progress { get; set; } = 0;

    public decimal Budget { get; set; } = 0;

    public Guid? ManagerId { get; set; }

    public List<Guid>? MemberIds { get; set; }
}
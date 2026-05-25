using ERPBPM.Domain.Common;

namespace ERPBPM.Domain.Entities;

public class Project : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public string Status { get; set; } = "Active";

    // tambahan
    public int Progress { get; set; } = 0;
    public decimal Budget { get; set; } = 0;

    // relasi
    public Guid OwnerId { get; set; }
    public User Owner { get; set; } = null!;

    public Guid? ManagerId { get; set; }
    public User? Manager { get; set; }

    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    public ICollection<ProjectMember> Members { get; set; } = new List<ProjectMember>();
}
using ERPBPM.Domain.Common;
using ERPBPM.Domain.Enums;

namespace ERPBPM.Domain.Entities;

public class Position : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public PositionLevel Level { get; set; }
    public decimal MinSalary { get; set; }
    public decimal MaxSalary { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}

using ERPBPM.Domain.Common;

namespace ERPBPM.Domain.Entities;

public class Workflow : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Definition { get; set; } = string.Empty; // JSON workflow definition
    public bool IsActive { get; set; } = true;
    public int Version { get; set; } = 1;
}

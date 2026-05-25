namespace ERPBPM.Application.DTOs.Position;

public class PositionDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Level { get; set; } = string.Empty;
    public decimal MinSalary { get; set; }
    public decimal MaxSalary { get; set; }
    public int EmployeeCount { get; set; }
    public bool IsActive { get; set; }
}

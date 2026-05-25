namespace ERPBPM.Application.DTOs.Position;

public class CreatePositionDto
{
    public string Title { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Level { get; set; } = "Mid";
    public decimal MinSalary { get; set; }
    public decimal MaxSalary { get; set; }
    public bool IsActive { get; set; } = true;
}

namespace ERPBPM.Application.DTOs.Position;

public class UpdatePositionDto
{
    public string? Title { get; set; }
    public string? Code { get; set; }
    public string? Description { get; set; }
    public string? Level { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public bool? IsActive { get; set; }
}

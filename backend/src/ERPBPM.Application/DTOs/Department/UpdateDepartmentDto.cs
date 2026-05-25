namespace ERPBPM.Application.DTOs.Department;

public class UpdateDepartmentDto
{
    public string? Name { get; set; }
    public string? Code { get; set; }
    public string? Description { get; set; }
    public Guid? ManagerId { get; set; }
    public bool? IsActive { get; set; }
}

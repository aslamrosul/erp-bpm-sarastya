namespace ERPBPM.Application.DTOs.Employee;

public class UpdateEmployeeDto
{
    public string? EmployeeNumber { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public DateTime? HireDate { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? PositionId { get; set; }
    public decimal? Salary { get; set; }
    public string? Status { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? EmergencyContact { get; set; }
    public string? EmergencyPhone { get; set; }
}

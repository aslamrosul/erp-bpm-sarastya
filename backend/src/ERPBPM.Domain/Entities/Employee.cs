using ERPBPM.Domain.Common;
using ERPBPM.Domain.Enums;

namespace ERPBPM.Domain.Entities;

public class Employee : BaseEntity
{
    public string EmployeeNumber { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public DateTime HireDate { get; set; }
    public Guid DepartmentId { get; set; }
    public Department Department { get; set; } = null!;
    public Guid PositionId { get; set; }
    public Position Position { get; set; } = null!;
    public decimal Salary { get; set; }
    public EmployeeStatus Status { get; set; } = EmployeeStatus.Active;
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? EmergencyContact { get; set; }
    public string? EmergencyPhone { get; set; }
}

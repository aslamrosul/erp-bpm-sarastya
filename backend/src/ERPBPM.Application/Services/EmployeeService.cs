using AutoMapper;
using ERPBPM.Application.DTOs.Employee;
using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;
using ERPBPM.Domain.Enums;

namespace ERPBPM.Application.Services;

public class EmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IMapper _mapper;

    public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper)
    {
        _employeeRepository = employeeRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
    {
        var employees = await _employeeRepository.GetAllAsync();
        return employees.Select(MapToDto);
    }

    public async Task<EmployeeDto?> GetByIdAsync(Guid id)
    {
        var employee = await _employeeRepository.GetByIdAsync(id);
        return employee != null ? MapToDto(employee) : null;
    }

    public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
    {
        var employee = new Employee
        {
            Id = Guid.NewGuid(),
            EmployeeNumber = dto.EmployeeNumber,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            DateOfBirth = DateTime.SpecifyKind(dto.DateOfBirth.Date, DateTimeKind.Utc),
            HireDate = DateTime.SpecifyKind(dto.HireDate.Date, DateTimeKind.Utc),
            DepartmentId = dto.DepartmentId,
            PositionId = dto.PositionId,
            Salary = dto.Salary,
            Status = ParseEmployeeStatus(dto.Status),
            Address = dto.Address ?? string.Empty,
            City = dto.City ?? string.Empty,
            Country = dto.Country ?? string.Empty,
            EmergencyContact = dto.EmergencyContact,
            EmergencyPhone = dto.EmergencyPhone,
            CreatedAt = DateTime.UtcNow
        };

        await _employeeRepository.CreateAsync(employee);
        
        // Reload with navigation properties
        var result = await _employeeRepository.GetByIdAsync(employee.Id);
        return MapToDto(result!);
    }

    public async Task<EmployeeDto> UpdateAsync(Guid id, UpdateEmployeeDto dto)
    {
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null)
            throw new Exception("Employee not found");

        if (dto.EmployeeNumber != null) employee.EmployeeNumber = dto.EmployeeNumber;
        if (dto.FirstName != null) employee.FirstName = dto.FirstName;
        if (dto.LastName != null) employee.LastName = dto.LastName;
        if (dto.Email != null) employee.Email = dto.Email;
        if (dto.Phone != null) employee.Phone = dto.Phone;
        if (dto.DateOfBirth.HasValue) employee.DateOfBirth = DateTime.SpecifyKind(dto.DateOfBirth.Value.Date, DateTimeKind.Utc);
        if (dto.HireDate.HasValue) employee.HireDate = DateTime.SpecifyKind(dto.HireDate.Value.Date, DateTimeKind.Utc);
        if (dto.DepartmentId.HasValue) employee.DepartmentId = dto.DepartmentId.Value;
        if (dto.PositionId.HasValue) employee.PositionId = dto.PositionId.Value;
        if (dto.Salary.HasValue) employee.Salary = dto.Salary.Value;
        if (dto.Status != null) employee.Status = ParseEmployeeStatus(dto.Status);
        if (dto.Address != null) employee.Address = dto.Address;
        if (dto.City != null) employee.City = dto.City;
        if (dto.Country != null) employee.Country = dto.Country;
        if (dto.EmergencyContact != null) employee.EmergencyContact = dto.EmergencyContact;
        if (dto.EmergencyPhone != null) employee.EmergencyPhone = dto.EmergencyPhone;

        employee.UpdatedAt = DateTime.UtcNow;

        await _employeeRepository.UpdateAsync(employee);
        var result = await _employeeRepository.GetByIdAsync(id);
        return MapToDto(result!);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _employeeRepository.DeleteAsync(id);
    }

    private EmployeeDto MapToDto(Employee employee)
    {
        return new EmployeeDto
        {
            Id = employee.Id,
            EmployeeNumber = employee.EmployeeNumber,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            Email = employee.Email,
            Phone = employee.Phone,
            DateOfBirth = employee.DateOfBirth,
            HireDate = employee.HireDate,
            DepartmentId = employee.DepartmentId,
            DepartmentName = employee.Department?.Name,
            PositionId = employee.PositionId,
            PositionName = employee.Position?.Title,
            Salary = employee.Salary,
            Status = employee.Status.ToString().ToLower().Replace("onleave", "on-leave"),
            Address = employee.Address,
            City = employee.City,
            Country = employee.Country,
            EmergencyContact = employee.EmergencyContact,
            EmergencyPhone = employee.EmergencyPhone
        };
    }

    private EmployeeStatus ParseEmployeeStatus(string status)
    {
        return status.ToLower() switch
        {
            "active" => EmployeeStatus.Active,
            "inactive" => EmployeeStatus.Inactive,
            "on-leave" => EmployeeStatus.OnLeave,
            _ => EmployeeStatus.Active
        };
    }
}

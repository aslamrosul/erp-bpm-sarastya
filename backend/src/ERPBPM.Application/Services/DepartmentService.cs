using AutoMapper;
using ERPBPM.Application.DTOs.Department;
using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Services;

public class DepartmentService
{
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IMapper _mapper;

    public DepartmentService(IDepartmentRepository departmentRepository, IMapper mapper)
    {
        _departmentRepository = departmentRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<DepartmentDto>> GetAllAsync()
    {
        var departments = await _departmentRepository.GetAllAsync();
        return departments.Select(MapToDto);
    }

    public async Task<DepartmentDto?> GetByIdAsync(Guid id)
    {
        var department = await _departmentRepository.GetByIdAsync(id);
        return department != null ? MapToDto(department) : null;
    }

    public async Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto)
    {
        var department = new Department
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Code = dto.Code,
            Description = dto.Description,
            ManagerId = dto.ManagerId,
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _departmentRepository.CreateAsync(department);
        var result = await _departmentRepository.GetByIdAsync(created.Id);
        return MapToDto(result!);
    }

    public async Task<DepartmentDto> UpdateAsync(Guid id, UpdateDepartmentDto dto)
    {
        var department = await _departmentRepository.GetByIdAsync(id);
        if (department == null)
            throw new Exception("Department not found");

        if (dto.Name != null) department.Name = dto.Name;
        if (dto.Code != null) department.Code = dto.Code;
        if (dto.Description != null) department.Description = dto.Description;
        if (dto.ManagerId.HasValue) department.ManagerId = dto.ManagerId;
        if (dto.IsActive.HasValue) department.IsActive = dto.IsActive.Value;

        department.UpdatedAt = DateTime.UtcNow;

        await _departmentRepository.UpdateAsync(department);
        var result = await _departmentRepository.GetByIdAsync(id);
        return MapToDto(result!);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _departmentRepository.DeleteAsync(id);
    }

    private DepartmentDto MapToDto(Department department)
    {
        return new DepartmentDto
        {
            Id = department.Id,
            Name = department.Name,
            Code = department.Code,
            Description = department.Description,
            ManagerId = department.ManagerId,
            ManagerName = department.Manager != null 
                ? $"{department.Manager.FirstName} {department.Manager.LastName}" 
                : null,
            EmployeeCount = department.Employees?.Count ?? 0,
            IsActive = department.IsActive
        };
    }
}

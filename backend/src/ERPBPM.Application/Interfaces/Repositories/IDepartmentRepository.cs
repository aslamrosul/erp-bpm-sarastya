using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Interfaces.Repositories;

public interface IDepartmentRepository
{
    Task<IEnumerable<Department>> GetAllAsync();
    Task<Department?> GetByIdAsync(Guid id);
    Task<Department> CreateAsync(Department department);
    Task<Department> UpdateAsync(Department department);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
    Task<bool> CodeExistsAsync(string code);
}

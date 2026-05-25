using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Interfaces.Repositories;

public interface IProjectRepository
{
    Task<Project?> GetByIdAsync(Guid id);
    Task<IEnumerable<Project>> GetAllAsync();
    Task<IEnumerable<Project>> GetByUserIdAsync(Guid userId);
    Task<Project> CreateAsync(Project project);
    Task<Project> UpdateAsync(Project project);
    Task DeleteAsync(Guid id);
}

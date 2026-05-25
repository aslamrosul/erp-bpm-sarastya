using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Interfaces.Repositories;

public interface ITaskRepository
{
    Task<TaskItem?> GetByIdAsync(Guid id);
    Task<IEnumerable<TaskItem>> GetAllAsync();
    Task<IEnumerable<TaskItem>> GetByProjectIdAsync(Guid projectId);
    Task<IEnumerable<TaskItem>> GetByAssigneeIdAsync(Guid userId);
    Task<TaskItem> CreateAsync(TaskItem task);
    Task<TaskItem> UpdateAsync(TaskItem task);
    Task DeleteAsync(Guid id);
}

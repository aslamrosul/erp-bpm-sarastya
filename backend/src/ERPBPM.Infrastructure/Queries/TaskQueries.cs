using ERPBPM.Domain.Entities;
using ERPBPM.Domain.Enums;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using TaskStatus = ERPBPM.Domain.Enums.TaskStatus;

namespace ERPBPM.Infrastructure.Queries;

public class TaskQueries
{
    private readonly ApplicationDbContext _context;

    public TaskQueries(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskItem>> GetOverdueTasksAsync()
    {
        return await _context.Set<TaskItem>()
            .Where(t => t.DueDate < DateTime.UtcNow && t.Status != TaskStatus.Done)
            .Include(t => t.Project)
            .Include(t => t.Assignee)
            .ToListAsync();
    }

    public async Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(TaskStatus status)
    {
        return await _context.Set<TaskItem>()
            .Where(t => t.Status == status)
            .ToListAsync();
    }
}

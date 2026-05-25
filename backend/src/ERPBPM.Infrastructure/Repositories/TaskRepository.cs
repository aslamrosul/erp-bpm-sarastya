using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPBPM.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly ApplicationDbContext _context;

    public TaskRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TaskItem?> GetByIdAsync(Guid id)
    {
        return await _context.Set<TaskItem>()
            .Include(t => t.Project)
            .Include(t => t.Assignee)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await _context.Set<TaskItem>()
            .Include(t => t.Project)
            .Include(t => t.Assignee)
            .ToListAsync();
    }

    public async Task<IEnumerable<TaskItem>> GetByProjectIdAsync(Guid projectId)
    {
        return await _context.Set<TaskItem>()
            .Where(t => t.ProjectId == projectId)
            .ToListAsync();
    }

    public async Task<IEnumerable<TaskItem>> GetByAssigneeIdAsync(Guid userId)
    {
        return await _context.Set<TaskItem>()
            .Where(t => t.AssigneeId == userId)
            .ToListAsync();
    }

    public async Task<TaskItem> CreateAsync(TaskItem task)
    {
        _context.Set<TaskItem>().Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<TaskItem> UpdateAsync(TaskItem task)
    {
        _context.Set<TaskItem>().Update(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task DeleteAsync(Guid id)
    {
        var task = await GetByIdAsync(id);
        if (task != null)
        {
            _context.Set<TaskItem>().Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}

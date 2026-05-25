using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPBPM.Infrastructure.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly ApplicationDbContext _context;

    public ProjectRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Project?> GetByIdAsync(Guid id)
    {
        return await _context.Set<Project>()
            .Include(p => p.Owner)
            .Include(p => p.Manager)
            .Include(p => p.Tasks)
            .Include(p => p.Members)
                .ThenInclude(m => m.User)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        return await _context.Set<Project>()
            .Include(p => p.Owner)
            .Include(p => p.Manager)
            .Include(p => p.Tasks)
            .Include(p => p.Members)
                .ThenInclude(m => m.User)
            .ToListAsync();
    }

    public async Task<IEnumerable<Project>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Set<Project>()
            .Where(p => p.OwnerId == userId)
            .ToListAsync();
    }

    public async Task<Project> CreateAsync(Project project)
    {
        // Detach navigation properties to avoid tracking issues
        _context.Entry(project).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
        
        _context.Set<Project>().Add(project);
        await _context.SaveChangesAsync();
        
        // Detach after save to allow fresh reload
        _context.Entry(project).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
        
        return project;
    }

    public async Task<Project> UpdateAsync(Project project)
    {
        _context.Set<Project>().Update(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task DeleteAsync(Guid id)
    {
        var project = await GetByIdAsync(id);
        if (project != null)
        {
            _context.Set<Project>().Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}

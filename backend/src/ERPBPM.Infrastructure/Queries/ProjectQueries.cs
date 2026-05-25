using ERPBPM.Domain.Entities;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPBPM.Infrastructure.Queries;

public class ProjectQueries
{
    private readonly ApplicationDbContext _context;

    public ProjectQueries(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Project>> GetActiveProjectsAsync()
    {
        return await _context.Set<Project>()
            .Where(p => p.Status == "Active")
            .Include(p => p.Owner)
            .Include(p => p.Tasks)
            .ToListAsync();
    }

    public async Task<IEnumerable<Project>> GetProjectsByDateRangeAsync(DateTime startDate, DateTime endDate)
    {
        return await _context.Set<Project>()
            .Where(p => p.StartDate >= startDate && p.StartDate <= endDate)
            .ToListAsync();
    }
}

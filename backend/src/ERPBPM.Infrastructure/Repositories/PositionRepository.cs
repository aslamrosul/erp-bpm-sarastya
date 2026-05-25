using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPBPM.Infrastructure.Repositories;

public class PositionRepository : IPositionRepository
{
    private readonly ApplicationDbContext _context;

    public PositionRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Position>> GetAllAsync()
    {
        return await _context.Positions
            .Include(p => p.Employees)
            .OrderBy(p => p.Title)
            .ToListAsync();
    }

    public async Task<Position?> GetByIdAsync(Guid id)
    {
        return await _context.Positions
            .Include(p => p.Employees)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Position> CreateAsync(Position position)
    {
        _context.Positions.Add(position);
        await _context.SaveChangesAsync();
        return position;
    }

    public async Task<Position> UpdateAsync(Position position)
    {
        _context.Positions.Update(position);
        await _context.SaveChangesAsync();
        return position;
    }

    public async Task DeleteAsync(Guid id)
    {
        var position = await _context.Positions.FindAsync(id);
        if (position != null)
        {
            _context.Positions.Remove(position);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Positions.AnyAsync(p => p.Id == id);
    }

    public async Task<bool> CodeExistsAsync(string code)
    {
        return await _context.Positions.AnyAsync(p => p.Code == code);
    }
}

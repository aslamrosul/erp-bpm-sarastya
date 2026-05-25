using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPBPM.Infrastructure.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly ApplicationDbContext _context;

    public DepartmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Department>> GetAllAsync()
    {
        return await _context.Departments
            .Include(d => d.Manager)
            .Include(d => d.Employees)
            .OrderBy(d => d.Name)
            .ToListAsync();
    }

    public async Task<Department?> GetByIdAsync(Guid id)
    {
        return await _context.Departments
            .Include(d => d.Manager)
            .Include(d => d.Employees)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<Department> CreateAsync(Department department)
    {
        _context.Departments.Add(department);
        await _context.SaveChangesAsync();
        return department;
    }

    public async Task<Department> UpdateAsync(Department department)
    {
        _context.Departments.Update(department);
        await _context.SaveChangesAsync();
        return department;
    }

    public async Task DeleteAsync(Guid id)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department != null)
        {
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Departments.AnyAsync(d => d.Id == id);
    }

    public async Task<bool> CodeExistsAsync(string code)
    {
        return await _context.Departments.AnyAsync(d => d.Code == code);
    }
}

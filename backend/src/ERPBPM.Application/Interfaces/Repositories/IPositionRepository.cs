using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Interfaces.Repositories;

public interface IPositionRepository
{
    Task<IEnumerable<Position>> GetAllAsync();
    Task<Position?> GetByIdAsync(Guid id);
    Task<Position> CreateAsync(Position position);
    Task<Position> UpdateAsync(Position position);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
    Task<bool> CodeExistsAsync(string code);
}

using AutoMapper;
using ERPBPM.Application.DTOs.Position;
using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;
using ERPBPM.Domain.Enums;

namespace ERPBPM.Application.Services;

public class PositionService
{
    private readonly IPositionRepository _positionRepository;
    private readonly IMapper _mapper;

    public PositionService(IPositionRepository positionRepository, IMapper mapper)
    {
        _positionRepository = positionRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PositionDto>> GetAllAsync()
    {
        var positions = await _positionRepository.GetAllAsync();
        return positions.Select(MapToDto);
    }

    public async Task<PositionDto?> GetByIdAsync(Guid id)
    {
        var position = await _positionRepository.GetByIdAsync(id);
        return position != null ? MapToDto(position) : null;
    }

    public async Task<PositionDto> CreateAsync(CreatePositionDto dto)
    {
        var position = new Position
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Code = dto.Code,
            Description = dto.Description,
            Level = ParsePositionLevel(dto.Level),
            MinSalary = dto.MinSalary,
            MaxSalary = dto.MaxSalary,
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _positionRepository.CreateAsync(position);
        var result = await _positionRepository.GetByIdAsync(created.Id);
        return MapToDto(result!);
    }

    public async Task<PositionDto> UpdateAsync(Guid id, UpdatePositionDto dto)
    {
        var position = await _positionRepository.GetByIdAsync(id);
        if (position == null)
            throw new Exception("Position not found");

        if (dto.Title != null) position.Title = dto.Title;
        if (dto.Code != null) position.Code = dto.Code;
        if (dto.Description != null) position.Description = dto.Description;
        if (dto.Level != null) position.Level = ParsePositionLevel(dto.Level);
        if (dto.MinSalary.HasValue) position.MinSalary = dto.MinSalary.Value;
        if (dto.MaxSalary.HasValue) position.MaxSalary = dto.MaxSalary.Value;
        if (dto.IsActive.HasValue) position.IsActive = dto.IsActive.Value;

        position.UpdatedAt = DateTime.UtcNow;

        await _positionRepository.UpdateAsync(position);
        var result = await _positionRepository.GetByIdAsync(id);
        return MapToDto(result!);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _positionRepository.DeleteAsync(id);
    }

    private PositionDto MapToDto(Position position)
    {
        return new PositionDto
        {
            Id = position.Id,
            Title = position.Title,
            Code = position.Code,
            Description = position.Description,
            Level = position.Level.ToString().ToLower(),
            MinSalary = position.MinSalary,
            MaxSalary = position.MaxSalary,
            EmployeeCount = position.Employees?.Count ?? 0,
            IsActive = position.IsActive
        };
    }

    private PositionLevel ParsePositionLevel(string level)
    {
        return level.ToLower() switch
        {
            "junior" => PositionLevel.Junior,
            "mid" => PositionLevel.Mid,
            "senior" => PositionLevel.Senior,
            "lead" => PositionLevel.Lead,
            "manager" => PositionLevel.Manager,
            "director" => PositionLevel.Director,
            _ => PositionLevel.Mid
        };
    }
}

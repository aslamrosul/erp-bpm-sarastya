using ERPBPM.Application.DTOs.Project;
using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Services;

public class ProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly IUserRepository _userRepository;

    public ProjectService(IProjectRepository projectRepository, IUserRepository userRepository)
    {
        _projectRepository = projectRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
    {
        var projects = await _projectRepository.GetAllAsync();
        var projectDtos = new List<ProjectDto>();

        foreach (var project in projects)
        {
            var owner = await _userRepository.GetByIdAsync(project.OwnerId);
            var manager = project.ManagerId.HasValue 
                ? await _userRepository.GetByIdAsync(project.ManagerId.Value) 
                : null;
            
            var totalTasks = project.Tasks.Count;
            var completedTasks = project.Tasks.Count(t => t.Status == Domain.Enums.TaskStatus.Done);
            var progress = totalTasks == 0 ? 0 : (int)((completedTasks * 100.0) / totalTasks);
            var teamCount = project.Members.Count;

            projectDtos.Add(new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                Progress = progress,
                Budget = project.Budget,
                TotalTasks = totalTasks,
                CompletedTasks = completedTasks,
                TeamCount = teamCount,
                OwnerId = project.OwnerId,
                OwnerName = owner != null
                    ? $"{owner.FirstName} {owner.LastName}"
                    : null,
                ManagerId = project.ManagerId,
                ManagerName = manager != null
                    ? $"{manager.FirstName} {manager.LastName}"
                    : null,
                CreatedAt = project.CreatedAt,
                UpdatedAt = project.UpdatedAt
            });
        }

        return projectDtos;
    }

    public async Task<ProjectDto?> GetProjectByIdAsync(Guid id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null) return null;

        var owner = await _userRepository.GetByIdAsync(project.OwnerId);
        var manager = project.ManagerId.HasValue 
            ? await _userRepository.GetByIdAsync(project.ManagerId.Value) 
            : null;
        
        var totalTasks = project.Tasks.Count;
        var completedTasks = project.Tasks.Count(t => t.Status == Domain.Enums.TaskStatus.Done);
        var progress = totalTasks == 0 ? 0 : (int)((completedTasks * 100.0) / totalTasks);
        var teamCount = project.Members.Count;

        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            Status = project.Status,
            Progress = progress,
            Budget = project.Budget,
            TotalTasks = totalTasks,
            CompletedTasks = completedTasks,
            TeamCount = teamCount,
            OwnerId = project.OwnerId,
            OwnerName = owner != null
                ? $"{owner.FirstName} {owner.LastName}"
                : null,
            ManagerId = project.ManagerId,
            ManagerName = manager != null
                ? $"{manager.FirstName} {manager.LastName}"
                : null,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt
        };
    }

    public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto dto, Guid ownerId)
    {
        var owner = await _userRepository.GetByIdAsync(ownerId);
        if (owner == null)
            throw new InvalidOperationException("Owner not found");

        if (dto.ManagerId.HasValue)
        {
            var managerCheck = await _userRepository.GetByIdAsync(dto.ManagerId.Value);
            if (managerCheck == null)
                throw new InvalidOperationException("Manager not found");
        }

        var project = new Project
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            StartDate = dto.StartDate.HasValue ? DateTime.SpecifyKind(dto.StartDate.Value.Date, DateTimeKind.Utc) : DateTime.UtcNow,
            EndDate = dto.EndDate.HasValue ? DateTime.SpecifyKind(dto.EndDate.Value.Date, DateTimeKind.Utc) : DateTime.UtcNow.AddMonths(1),
            Status = dto.Status ?? "Active",
            Progress = dto.Progress,
            Budget = dto.Budget,
            OwnerId = ownerId,
            ManagerId = dto.ManagerId,
            CreatedAt = DateTime.UtcNow
        };

        await _projectRepository.CreateAsync(project);

        // Add members if provided
        if (dto.MemberIds != null && dto.MemberIds.Any())
        {
            foreach (var memberId in dto.MemberIds)
            {
                var user = await _userRepository.GetByIdAsync(memberId);
                if (user != null)
                {
                    project.Members.Add(new ProjectMember
                    {
                        ProjectId = project.Id,
                        UserId = memberId,
                        JoinedAt = DateTime.UtcNow
                    });
                }
            }
            await _projectRepository.UpdateAsync(project);
        }

        // Reload with navigation properties
        var reloaded = await _projectRepository.GetByIdAsync(project.Id);
        var manager = reloaded!.ManagerId.HasValue 
            ? await _userRepository.GetByIdAsync(reloaded.ManagerId.Value) 
            : null;

        return new ProjectDto
        {
            Id = reloaded.Id,
            Name = reloaded.Name,
            Description = reloaded.Description,
            StartDate = reloaded.StartDate,
            EndDate = reloaded.EndDate,
            Status = reloaded.Status,
            Progress = 0,
            Budget = reloaded.Budget,
            TotalTasks = 0,
            CompletedTasks = 0,
            TeamCount = reloaded.Members.Count,
            OwnerId = reloaded.OwnerId,
            OwnerName = $"{owner.FirstName} {owner.LastName}",
            ManagerId = reloaded.ManagerId,
            ManagerName = manager != null
                ? $"{manager.FirstName} {manager.LastName}"
                : null,
            CreatedAt = reloaded.CreatedAt,
            UpdatedAt = reloaded.UpdatedAt
        };
    }

    public async Task<ProjectDto> UpdateProjectAsync(Guid id, UpdateProjectDto dto)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            throw new KeyNotFoundException("Project not found");

        if (dto.ManagerId.HasValue)
        {
            var managerCheck = await _userRepository.GetByIdAsync(dto.ManagerId.Value);
            if (managerCheck == null)
                throw new InvalidOperationException("Manager not found");
        }

        project.Name = dto.Name;
        project.Description = dto.Description;
        project.StartDate = dto.StartDate.HasValue ? DateTime.SpecifyKind(dto.StartDate.Value.Date, DateTimeKind.Utc) : project.StartDate;
        project.EndDate = dto.EndDate.HasValue ? DateTime.SpecifyKind(dto.EndDate.Value.Date, DateTimeKind.Utc) : project.EndDate;
        project.Status = dto.Status;
        project.Progress = dto.Progress;
        project.Budget = dto.Budget;
        project.ManagerId = dto.ManagerId;
        project.UpdatedAt = DateTime.UtcNow;

        await _projectRepository.UpdateAsync(project);

        var owner = await _userRepository.GetByIdAsync(project.OwnerId);
        var manager = project.ManagerId.HasValue 
            ? await _userRepository.GetByIdAsync(project.ManagerId.Value) 
            : null;
        
        var totalTasks = project.Tasks.Count;
        var completedTasks = project.Tasks.Count(t => t.Status == Domain.Enums.TaskStatus.Done);
        var progress = totalTasks == 0 ? 0 : (int)((completedTasks * 100.0) / totalTasks);
        var teamCount = project.Members.Count;

        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            Status = project.Status,
            Progress = progress,
            Budget = project.Budget,
            TotalTasks = totalTasks,
            CompletedTasks = completedTasks,
            TeamCount = teamCount,
            OwnerId = project.OwnerId,
            OwnerName = owner != null
                ? $"{owner.FirstName} {owner.LastName}"
                : null,
            ManagerId = project.ManagerId,
            ManagerName = manager != null
                ? $"{manager.FirstName} {manager.LastName}"
                : null,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt
        };
    }

    public async Task<bool> DeleteProjectAsync(Guid id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            return false;

        await _projectRepository.DeleteAsync(id);
        return true;
    }
}

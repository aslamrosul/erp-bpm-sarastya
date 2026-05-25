using ERPBPM.Application.DTOs.Task;
using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Services;

public class TaskService
{
    private readonly ITaskRepository _taskRepository;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserRepository _userRepository;

    public TaskService(
        ITaskRepository taskRepository,
        IProjectRepository projectRepository,
        IUserRepository userRepository)
    {
        _taskRepository = taskRepository;
        _projectRepository = projectRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
    {
        var tasks = await _taskRepository.GetAllAsync();
        return await MapTasksToDtos(tasks);
    }

    public async Task<IEnumerable<TaskDto>> GetTasksByProjectIdAsync(Guid projectId)
    {
        var tasks = await _taskRepository.GetByProjectIdAsync(projectId);
        return await MapTasksToDtos(tasks);
    }

    public async Task<IEnumerable<TaskDto>> GetTasksByAssigneeIdAsync(Guid userId)
    {
        var tasks = await _taskRepository.GetByAssigneeIdAsync(userId);
        return await MapTasksToDtos(tasks);
    }

    public async Task<TaskDto?> GetTaskByIdAsync(Guid id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null) return null;

        return await MapTaskToDto(task);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
    {
        var project = await _projectRepository.GetByIdAsync(dto.ProjectId);
        if (project == null)
            throw new InvalidOperationException("Project not found");

        if (dto.AssigneeId.HasValue)
        {
            var assignee = await _userRepository.GetByIdAsync(dto.AssigneeId.Value);
            if (assignee == null)
                throw new InvalidOperationException("Assignee not found");
        }

        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            StartDate = dto.StartDate.HasValue ? DateTime.SpecifyKind(dto.StartDate.Value.Date, DateTimeKind.Utc) : (DateTime?)null,
            EndDate = dto.EndDate.HasValue ? DateTime.SpecifyKind(dto.EndDate.Value.Date, DateTimeKind.Utc) : (DateTime?)null,
            DueDate = dto.DueDate.HasValue ? DateTime.SpecifyKind(dto.DueDate.Value.Date, DateTimeKind.Utc) : (DateTime?)null,
            ProjectId = dto.ProjectId,
            AssigneeId = dto.AssigneeId,
            CreatedAt = DateTime.UtcNow
        };

        await _taskRepository.CreateAsync(task);

        return await MapTaskToDto(task);
    }

    public async Task<TaskDto> UpdateTaskAsync(Guid id, UpdateTaskDto dto)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null)
            throw new KeyNotFoundException("Task not found");

        if (dto.AssigneeId.HasValue)
        {
            var assignee = await _userRepository.GetByIdAsync(dto.AssigneeId.Value);
            if (assignee == null)
                throw new InvalidOperationException("Assignee not found");
        }

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.Priority = dto.Priority;
        task.StartDate = dto.StartDate.HasValue ? DateTime.SpecifyKind(dto.StartDate.Value.Date, DateTimeKind.Utc) : (DateTime?)null;
        task.EndDate = dto.EndDate.HasValue ? DateTime.SpecifyKind(dto.EndDate.Value.Date, DateTimeKind.Utc) : (DateTime?)null;
        task.DueDate = dto.DueDate.HasValue ? DateTime.SpecifyKind(dto.DueDate.Value.Date, DateTimeKind.Utc) : (DateTime?)null;
        task.AssigneeId = dto.AssigneeId;
        task.UpdatedAt = DateTime.UtcNow;

        await _taskRepository.UpdateAsync(task);

        return await MapTaskToDto(task);
    }

    public async Task<bool> DeleteTaskAsync(Guid id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null)
            return false;

        await _taskRepository.DeleteAsync(id);
        return true;
    }

    private async Task<IEnumerable<TaskDto>> MapTasksToDtos(IEnumerable<TaskItem> tasks)
    {
        var taskDtos = new List<TaskDto>();

        foreach (var task in tasks)
        {
            taskDtos.Add(await MapTaskToDto(task));
        }

        return taskDtos;
    }

    private async Task<TaskDto> MapTaskToDto(TaskItem task)
    {
        var project = task.Project ?? await _projectRepository.GetByIdAsync(task.ProjectId);
        var assignee = task.Assignee ?? (task.AssigneeId.HasValue 
            ? await _userRepository.GetByIdAsync(task.AssigneeId.Value) 
            : null);

        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status.ToString(),
            Priority = task.Priority.ToString(),
            StartDate = task.StartDate,
            EndDate = task.EndDate,
            DueDate = task.DueDate,
            ProjectId = task.ProjectId,
            ProjectName = project?.Name,
            AssigneeId = task.AssigneeId,
            AssigneeName = assignee != null 
                ? $"{assignee.FirstName} {assignee.LastName}" 
                : null,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt
        };
    }
}

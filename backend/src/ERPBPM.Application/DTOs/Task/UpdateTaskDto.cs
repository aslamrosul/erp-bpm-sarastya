using TaskStatusEnum = ERPBPM.Domain.Enums.TaskStatus;
using TaskPriorityEnum = ERPBPM.Domain.Enums.TaskPriority;

namespace ERPBPM.Application.DTOs.Task;

public class UpdateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskStatusEnum Status { get; set; }
    public TaskPriorityEnum Priority { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? DueDate { get; set; }
    public Guid? AssigneeId { get; set; }
}

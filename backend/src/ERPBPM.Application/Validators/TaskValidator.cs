using FluentValidation;
using ERPBPM.Application.DTOs.Task;

namespace ERPBPM.Application.Validators;

public class TaskValidator : AbstractValidator<CreateTaskDto>
{
    public TaskValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Task title is required")
            .MaximumLength(200).WithMessage("Title cannot exceed 200 characters");

        RuleFor(x => x.Description)
            .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters");

        RuleFor(x => x.Priority)
            .IsInEnum().WithMessage("Invalid priority value");

        RuleFor(x => x.Status)
            .IsInEnum().WithMessage("Invalid status value");

        RuleFor(x => x.ProjectId)
            .NotEmpty().WithMessage("Project ID is required");
    }
}

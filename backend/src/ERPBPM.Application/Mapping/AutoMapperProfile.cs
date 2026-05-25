using AutoMapper;
using ERPBPM.Application.DTOs.Auth;
using ERPBPM.Application.DTOs.Task;
using ERPBPM.Application.DTOs.Project;
using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Mapping;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<RegisterDto, User>();
        CreateMap<User, LoginDto>().ReverseMap();
        
        // Task mappings
        CreateMap<TaskItem, TaskDto>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
            .ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority.ToString()))
            .ForMember(dest => dest.ProjectName, opt => opt.MapFrom(src => src.Project != null ? src.Project.Name : null))
            .ForMember(dest => dest.AssigneeName, opt => opt.MapFrom(src => src.Assignee != null ? $"{src.Assignee.FirstName} {src.Assignee.LastName}" : null));
        
        // Project mappings
        CreateMap<Project, ProjectDto>()
            .ForMember(dest => dest.ManagerName, opt => opt.MapFrom(src => src.Manager != null ? $"{src.Manager.FirstName} {src.Manager.LastName}" : null))
            .ForMember(dest => dest.TeamCount, opt => opt.MapFrom(src => src.Members.Count));
    }
}

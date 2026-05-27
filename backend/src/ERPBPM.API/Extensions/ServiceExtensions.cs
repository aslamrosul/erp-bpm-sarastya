using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Application.Interfaces.Infrastructure;
using ERPBPM.Application.Services;
using ERPBPM.Infrastructure.Authentication;
using ERPBPM.Infrastructure.Repositories;
using ERPBPM.Infrastructure.Queries;

namespace ERPBPM.API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // CORS
        var allowedOrigins = Environment
            .GetEnvironmentVariable("ALLOWED_ORIGINS")?
            .Split(",", StringSplitOptions.RemoveEmptyEntries);

        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", policy =>
            {
                if (allowedOrigins != null && allowedOrigins.Length > 0)
                {
                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials();
                }
                else
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                }
            });
        });

        // AutoMapper
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<ITaskRepository, TaskRepository>();
        services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        services.AddScoped<IDepartmentRepository, DepartmentRepository>();
        services.AddScoped<IPositionRepository, PositionRepository>();

        // Infrastructure Services
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        // Application Services
        services.AddScoped<AuthService>();
        services.AddScoped<UserService>();
        services.AddScoped<ProjectService>();
        services.AddScoped<TaskService>();
        services.AddScoped<EmployeeService>();
        services.AddScoped<DepartmentService>();
        services.AddScoped<PositionService>();

        // Queries
        services.AddScoped<DashboardQueries>();

        return services;
    }
}
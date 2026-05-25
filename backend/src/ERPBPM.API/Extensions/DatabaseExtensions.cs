using Microsoft.EntityFrameworkCore;
using ERPBPM.Infrastructure.Persistence;

namespace ERPBPM.API.Extensions;

public static class DatabaseExtensions
{
    public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        return services;
    }
}

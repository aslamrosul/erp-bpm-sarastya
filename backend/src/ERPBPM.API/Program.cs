using ERPBPM.API.Extensions;
using ERPBPM.API.Middleware;
using ERPBPM.API.Filters;
using ERPBPM.Infrastructure.Persistence;
using ERPBPM.Infrastructure.Persistence.Seed;
using ERPBPM.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to listen on all network interfaces
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000); // HTTP
});

// Add services
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
})
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    // Ensure DateTime is serialized in UTC format
    options.JsonSerializerOptions.WriteIndented = false;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();

// Custom extensions
builder.Services.AddSwaggerDocumentation();
builder.Services.AddAuthenticationServices(builder.Configuration);
builder.Services.AddDatabaseServices(builder.Configuration);
builder.Services.AddApplicationServices();

var app = builder.Build();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await DataSeeder.SeedAsync(context);
    await ProjectSeeder.SeedProjectsAndTasksAsync(context);
    await HRMSeeder.SeedAsync(context);
}

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<RequestLoggingMiddleware>();

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

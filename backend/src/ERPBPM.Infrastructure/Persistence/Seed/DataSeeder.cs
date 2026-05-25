using ERPBPM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ERPBPM.Infrastructure.Persistence.Seed;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Ensure database is created
        await context.Database.EnsureCreatedAsync();

        // Seed users if no users exist
        if (!await context.Users.AnyAsync())
        {
            var users = new List<User>
            {
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "admin",
                    Email = "admin@konekerp.com",
                    FirstName = "Admin",
                    LastName = "User",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "ahmad.fauzi",
                    Email = "ahmad.fauzi@konekerp.com",
                    FirstName = "Ahmad",
                    LastName = "Fauzi",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "siti.nurhaliza",
                    Email = "siti.nurhaliza@konekerp.com",
                    FirstName = "Siti",
                    LastName = "Nurhaliza",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "budi.santoso",
                    Email = "budi.santoso@konekerp.com",
                    FirstName = "Budi",
                    LastName = "Santoso",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "maya.putri",
                    Email = "maya.putri@konekerp.com",
                    FirstName = "Maya",
                    LastName = "Putri",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "farhan.rizki",
                    Email = "farhan.rizki@konekerp.com",
                    FirstName = "Farhan",
                    LastName = "Rizki",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "lisa.amanda",
                    Email = "lisa.amanda@konekerp.com",
                    FirstName = "Lisa",
                    LastName = "Amanda",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Username = "dedi.kurniawan",
                    Email = "dedi.kurniawan@konekerp.com",
                    FirstName = "Dedi",
                    LastName = "Kurniawan",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                }
            };

            context.Users.AddRange(users);
            await context.SaveChangesAsync();

            Console.WriteLine($"✅ {users.Count} users created successfully!");
            Console.WriteLine("   Admin - Username: admin, Password: admin123");
            Console.WriteLine("   Others - Password: password123");
        }
        else
        {
            Console.WriteLine("ℹ️  Users already exist, skipping seed.");
        }
    }
}

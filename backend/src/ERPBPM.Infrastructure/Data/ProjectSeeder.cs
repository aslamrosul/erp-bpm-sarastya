using ERPBPM.Domain.Entities;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using TaskStatusEnum = ERPBPM.Domain.Enums.TaskStatus;
using TaskPriorityEnum = ERPBPM.Domain.Enums.TaskPriority;

namespace ERPBPM.Infrastructure.Data;

public static class ProjectSeeder
{
    public static async Task SeedProjectsAndTasksAsync(ApplicationDbContext context)
    {
        // Check if already seeded
        if (await context.Projects.AnyAsync())
        {
            Console.WriteLine("ℹ️  Projects already exist, skipping seed.");
            return;
        }

        var users = await context.Users.ToListAsync();
        if (!users.Any())
        {
            Console.WriteLine("⚠️  No users found. Please seed users first.");
            return;
        }

        // Seed roles first
        await SeedRolesAsync(context);
        
        // Assign roles to users
        await AssignRolesToUsersAsync(context, users);

        var adminUser = users.First();
        var otherUsers = users.Skip(1).ToList();

        var projects = new List<Project>
        {
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "ERP Implementation",
                Description = "Complete ERP system deployment for enterprise client",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 1, 15), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 6, 30), DateTimeKind.Utc),
                Budget = 500000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 1 ? users[1].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Website Redesign",
                Description = "Modern responsive website with improved UX",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 3, 1), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 5, 31), DateTimeKind.Utc),
                Budget = 150000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 2 ? users[2].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Mobile App Development",
                Description = "iOS and Android native applications",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 4, 1), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 8, 31), DateTimeKind.Utc),
                Budget = 300000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 1 ? users[1].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "CRM Integration",
                Description = "Salesforce CRM integration with existing systems",
                Status = "Completed",
                StartDate = DateTime.SpecifyKind(new DateTime(2025, 11, 1), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 2, 28), DateTimeKind.Utc),
                Budget = 200000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 3 ? users[3].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow.AddMonths(-4)
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Data Migration",
                Description = "Legacy system data migration to cloud",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 2, 15), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 5, 15), DateTimeKind.Utc),
                Budget = 100000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 4 ? users[4].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow.AddMonths(-2)
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Security Audit",
                Description = "Comprehensive security assessment and penetration testing",
                Status = "On Hold",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 3, 15), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 6, 15), DateTimeKind.Utc),
                Budget = 75000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 1 ? users[1].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow.AddMonths(-1)
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "HR System Upgrade",
                Description = "Modernize HR management system",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 5, 1), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 9, 30), DateTimeKind.Utc),
                Budget = 180000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 2 ? users[2].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Cloud Infrastructure Migration",
                Description = "Move infrastructure to AWS cloud",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 4, 15), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 10, 31), DateTimeKind.Utc),
                Budget = 450000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 3 ? users[3].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Business Intelligence Dashboard",
                Description = "Real-time analytics and reporting dashboard",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 3, 1), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 7, 31), DateTimeKind.Utc),
                Budget = 220000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 4 ? users[4].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Customer Portal Revamp",
                Description = "Self-service customer portal with enhanced features",
                Status = "Active",
                StartDate = DateTime.SpecifyKind(new DateTime(2026, 5, 15), DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(new DateTime(2026, 8, 15), DateTimeKind.Utc),
                Budget = 130000000,
                OwnerId = adminUser.Id,
                ManagerId = users.Count > 1 ? users[1].Id : adminUser.Id,
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Projects.AddRangeAsync(projects);
        await context.SaveChangesAsync();

        // Create tasks for each project
        var tasks = new List<TaskItem>();
        var random = new Random(42); // Fixed seed for consistency

        // ERP Implementation tasks
        tasks.AddRange(CreateTasksForProject(projects[0].Id, new[]
        {
            ("Setup database schema", TaskStatusEnum.Done, TaskPriorityEnum.High, -30, -25),
            ("API development", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -20, 10),
            ("Authentication module", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -15, 5),
            ("User management UI", TaskStatusEnum.Review, TaskPriorityEnum.Medium, -10, 15),
            ("Financial report integration", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 5, 30),
            ("Inventory module", TaskStatusEnum.Todo, TaskPriorityEnum.Low, 10, 40)
        }, users, random));

        // Website Redesign tasks
        tasks.AddRange(CreateTasksForProject(projects[1].Id, new[]
        {
            ("Homepage redesign", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -10, 20),
            ("Responsive layout", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -5, 25),
            ("SEO optimization", TaskStatusEnum.Review, TaskPriorityEnum.Medium, 0, 30),
            ("User testing", TaskStatusEnum.Todo, TaskPriorityEnum.Low, 15, 40),
            ("Performance optimization", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 20, 50)
        }, users, random));

        // Mobile App Development tasks
        tasks.AddRange(CreateTasksForProject(projects[2].Id, new[]
        {
            ("iOS app development", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -15, 60),
            ("Android app development", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -15, 60),
            ("API integration", TaskStatusEnum.Review, TaskPriorityEnum.High, -10, 30),
            ("Push notifications", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 10, 50),
            ("App store submission", TaskStatusEnum.Todo, TaskPriorityEnum.Low, 50, 70)
        }, users, random));

        // CRM Integration tasks (completed project)
        tasks.AddRange(CreateTasksForProject(projects[3].Id, new[]
        {
            ("Requirements analysis", TaskStatusEnum.Done, TaskPriorityEnum.High, -120, -110),
            ("API setup", TaskStatusEnum.Done, TaskPriorityEnum.High, -110, -100),
            ("Data mapping", TaskStatusEnum.Done, TaskPriorityEnum.Medium, -100, -90),
            ("Testing", TaskStatusEnum.Done, TaskPriorityEnum.High, -90, -80),
            ("Deployment", TaskStatusEnum.Done, TaskPriorityEnum.High, -80, -75)
        }, users, random));

        // Data Migration tasks
        tasks.AddRange(CreateTasksForProject(projects[4].Id, new[]
        {
            ("Data audit", TaskStatusEnum.Done, TaskPriorityEnum.High, -60, -50),
            ("Migration scripts", TaskStatusEnum.Done, TaskPriorityEnum.High, -50, -30),
            ("Test migration", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -30, -10),
            ("Production migration", TaskStatusEnum.Todo, TaskPriorityEnum.High, -10, 10),
            ("Validation", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 10, 20)
        }, users, random));

        // Security Audit tasks
        tasks.AddRange(CreateTasksForProject(projects[5].Id, new[]
        {
            ("Vulnerability scanning", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -15, 15),
            ("Penetration testing", TaskStatusEnum.Todo, TaskPriorityEnum.High, 10, 40),
            ("Security patching", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 35, 60),
            ("Documentation", TaskStatusEnum.Todo, TaskPriorityEnum.Low, 55, 75)
        }, users, random));

        // HR System Upgrade tasks
        tasks.AddRange(CreateTasksForProject(projects[6].Id, new[]
        {
            ("Requirements gathering", TaskStatusEnum.InProgress, TaskPriorityEnum.High, 0, 20),
            ("System design", TaskStatusEnum.Todo, TaskPriorityEnum.High, 15, 40),
            ("Development", TaskStatusEnum.Todo, TaskPriorityEnum.High, 35, 80),
            ("User training", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 75, 100)
        }, users, random));

        // Cloud Infrastructure Migration tasks
        tasks.AddRange(CreateTasksForProject(projects[7].Id, new[]
        {
            ("Infrastructure planning", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -10, 20),
            ("AWS setup", TaskStatusEnum.InProgress, TaskPriorityEnum.High, 10, 40),
            ("Migration execution", TaskStatusEnum.Todo, TaskPriorityEnum.High, 35, 80),
            ("Monitoring setup", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 75, 110),
            ("Cost optimization", TaskStatusEnum.Todo, TaskPriorityEnum.Low, 105, 130)
        }, users, random));

        // Business Intelligence Dashboard tasks
        tasks.AddRange(CreateTasksForProject(projects[8].Id, new[]
        {
            ("Data source integration", TaskStatusEnum.InProgress, TaskPriorityEnum.High, -15, 30),
            ("Dashboard design", TaskStatusEnum.Review, TaskPriorityEnum.High, -10, 20),
            ("Report development", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 15, 60),
            ("User access control", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 50, 80)
        }, users, random));

        // Customer Portal Revamp tasks
        tasks.AddRange(CreateTasksForProject(projects[9].Id, new[]
        {
            ("UI/UX design", TaskStatusEnum.InProgress, TaskPriorityEnum.High, 0, 30),
            ("Frontend development", TaskStatusEnum.Todo, TaskPriorityEnum.High, 25, 60),
            ("Backend API", TaskStatusEnum.Todo, TaskPriorityEnum.High, 25, 60),
            ("Testing", TaskStatusEnum.Todo, TaskPriorityEnum.Medium, 55, 75)
        }, users, random));

        await context.Tasks.AddRangeAsync(tasks);
        await context.SaveChangesAsync();

        // Seed project members
        await SeedProjectMembersAsync(context, projects, users);

        // Update project progress based on task completion
        await UpdateProjectProgressAsync(context, projects);

        Console.WriteLine($"✅ Seeded {projects.Count} projects and {tasks.Count} tasks successfully!");
    }

    private static async Task SeedRolesAsync(ApplicationDbContext context)
    {
        if (await context.Roles.AnyAsync())
        {
            Console.WriteLine("ℹ️  Roles already exist, skipping role seed.");
            return;
        }

        var roles = new List<Role>
        {
            new Role
            {
                Id = Guid.NewGuid(),
                Name = "Admin",
                Description = "System administrator with full access",
                CreatedAt = DateTime.UtcNow
            },
            new Role
            {
                Id = Guid.NewGuid(),
                Name = "Manager",
                Description = "Project manager with team oversight",
                CreatedAt = DateTime.UtcNow
            },
            new Role
            {
                Id = Guid.NewGuid(),
                Name = "Developer",
                Description = "Software developer working on tasks",
                CreatedAt = DateTime.UtcNow
            },
            new Role
            {
                Id = Guid.NewGuid(),
                Name = "Tester",
                Description = "Quality assurance tester",
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Roles.AddRangeAsync(roles);
        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Seeded {roles.Count} roles successfully!");
    }

    private static async Task AssignRolesToUsersAsync(ApplicationDbContext context, List<User> users)
    {
        var roles = await context.Roles.ToListAsync();
        if (!roles.Any())
        {
            Console.WriteLine("⚠️  No roles found. Cannot assign roles to users.");
            return;
        }

        var adminRole = roles.FirstOrDefault(r => r.Name == "Admin");
        var managerRole = roles.FirstOrDefault(r => r.Name == "Manager");
        var developerRole = roles.FirstOrDefault(r => r.Name == "Developer");
        var testerRole = roles.FirstOrDefault(r => r.Name == "Tester");

        // Assign roles to users
        if (users.Count > 0 && adminRole != null)
        {
            users[0].RoleId = adminRole.Id; // admin user
        }
        if (users.Count > 1 && managerRole != null)
        {
            users[1].RoleId = managerRole.Id; // john.doe
        }
        if (users.Count > 2 && managerRole != null)
        {
            users[2].RoleId = managerRole.Id; // jane.smith
        }
        if (users.Count > 3 && developerRole != null)
        {
            users[3].RoleId = developerRole.Id; // mike.johnson
        }
        if (users.Count > 4 && developerRole != null)
        {
            users[4].RoleId = developerRole.Id; // sarah.williams
        }
        if (users.Count > 5 && developerRole != null)
        {
            users[5].RoleId = developerRole.Id; // david.brown
        }
        if (users.Count > 6 && testerRole != null)
        {
            users[6].RoleId = testerRole.Id; // emily.davis
        }
        if (users.Count > 7 && developerRole != null)
        {
            users[7].RoleId = developerRole.Id; // robert.miller
        }

        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Assigned roles to {users.Count} users successfully!");
    }

    private static async Task SeedProjectMembersAsync(ApplicationDbContext context, List<Project> projects, List<User> users)
    {
        var projectMembers = new List<ProjectMember>();
        var random = new Random(42);

        foreach (var project in projects)
        {
            // Add 3-5 random team members to each project (excluding owner and manager)
            var memberCount = random.Next(3, 6);
            var availableUsers = users
                .Where(u => u.Id != project.OwnerId && u.Id != project.ManagerId)
                .OrderBy(x => random.Next())
                .Take(memberCount)
                .ToList();

            foreach (var user in availableUsers)
            {
                projectMembers.Add(new ProjectMember
                {
                    ProjectId = project.Id,
                    UserId = user.Id,
                    JoinedAt = project.CreatedAt.AddDays(random.Next(1, 10))
                });
            }
        }

        await context.ProjectMembers.AddRangeAsync(projectMembers);
        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Seeded {projectMembers.Count} project members successfully!");
    }

    private static async Task UpdateProjectProgressAsync(ApplicationDbContext context, List<Project> projects)
    {
        foreach (var project in projects)
        {
            var projectTasks = await context.Tasks
                .Where(t => t.ProjectId == project.Id)
                .ToListAsync();

            if (projectTasks.Any())
            {
                var completedTasks = projectTasks.Count(t => t.Status == TaskStatusEnum.Done);
                var totalTasks = projectTasks.Count;
                project.Progress = (int)Math.Round((double)completedTasks / totalTasks * 100);
            }
            else
            {
                project.Progress = 0;
            }
        }

        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Updated progress for {projects.Count} projects successfully!");
    }

    private static List<TaskItem> CreateTasksForProject(
        Guid projectId,
        (string title, TaskStatusEnum status, TaskPriorityEnum priority, int startOffset, int endOffset)[] taskData,
        List<User> users,
        Random random)
    {
        var tasks = new List<TaskItem>();
        var baseDate = DateTime.UtcNow;

        foreach (var (title, status, priority, startOffset, endOffset) in taskData)
        {
            var assignee = users[random.Next(users.Count)];
            
            tasks.Add(new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = title,
                Description = $"Task for {title}",
                Status = status,
                Priority = priority,
                StartDate = baseDate.AddDays(startOffset),
                EndDate = baseDate.AddDays(endOffset),
                DueDate = baseDate.AddDays(endOffset),
                ProjectId = projectId,
                AssigneeId = assignee.Id,
                CreatedAt = DateTime.UtcNow
            });
        }

        return tasks;
    }
}

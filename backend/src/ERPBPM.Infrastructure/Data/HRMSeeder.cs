using ERPBPM.Domain.Entities;
using ERPBPM.Domain.Enums;
using ERPBPM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ERPBPM.Infrastructure.Data;

public static class HRMSeeder
{
    private static DateTime Utc(int year, int month, int day)
    {
        return DateTime.SpecifyKind(new DateTime(year, month, day), DateTimeKind.Utc);
    }

    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Check if already seeded - check all three tables
        var hasPositions = await context.Positions.AnyAsync();
        var hasDepartments = await context.Departments.AnyAsync();
        var hasEmployees = await context.Employees.AnyAsync();
        
        if (hasPositions && hasDepartments && hasEmployees)
        {
            Console.WriteLine("ℹ️  HRM data already exists, skipping seed.");
            return;
        }

        Console.WriteLine("🏢 Seeding HRM data...");

        // 1. Seed Positions first (no dependencies)
        var positions = await SeedPositionsAsync(context);

        // 2. Seed Departments (no dependencies yet)
        var departments = await SeedDepartmentsAsync(context);

        // 3. Seed Employees (depends on Departments and Positions)
        var employees = await SeedEmployeesAsync(context, departments, positions);

        // 4. Update Department Managers
        await UpdateDepartmentManagersAsync(context, departments, employees);

        Console.WriteLine("✅ HRM seeding completed!");
    }

    private static async Task<List<Position>> SeedPositionsAsync(ApplicationDbContext context)
    {
        var positions = new List<Position>
        {
            // IT Positions
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "IT-DIR",
                Title = "IT Director",
                Description = "Head of IT Department",
                Level = PositionLevel.Director,
                MinSalary = 25000000,
                MaxSalary = 40000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "IT-MGR",
                Title = "IT Manager",
                Description = "IT Team Manager",
                Level = PositionLevel.Manager,
                MinSalary = 18000000,
                MaxSalary = 28000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "DEV-SR",
                Title = "Senior Software Developer",
                Description = "Senior level software developer",
                Level = PositionLevel.Senior,
                MinSalary = 15000000,
                MaxSalary = 22000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "DEV-MID",
                Title = "Software Developer",
                Description = "Mid level software developer",
                Level = PositionLevel.Mid,
                MinSalary = 10000000,
                MaxSalary = 16000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "DEV-JR",
                Title = "Junior Developer",
                Description = "Entry level developer",
                Level = PositionLevel.Junior,
                MinSalary = 6000000,
                MaxSalary = 10000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            // HR Positions
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "HR-MGR",
                Title = "HR Manager",
                Description = "Human Resources Manager",
                Level = PositionLevel.Manager,
                MinSalary = 15000000,
                MaxSalary = 25000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "HR-SPV",
                Title = "HR Supervisor",
                Description = "HR Team Supervisor",
                Level = PositionLevel.Lead,
                MinSalary = 10000000,
                MaxSalary = 15000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            // Finance Positions
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "FIN-MGR",
                Title = "Finance Manager",
                Description = "Finance Department Manager",
                Level = PositionLevel.Manager,
                MinSalary = 18000000,
                MaxSalary = 28000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "ACC-SR",
                Title = "Senior Accountant",
                Description = "Senior level accountant",
                Level = PositionLevel.Senior,
                MinSalary = 12000000,
                MaxSalary = 18000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            // Sales & Marketing
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "SALES-MGR",
                Title = "Sales Manager",
                Description = "Sales Team Manager",
                Level = PositionLevel.Manager,
                MinSalary = 15000000,
                MaxSalary = 25000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Position
            {
                Id = Guid.NewGuid(),
                Code = "MKT-SPV",
                Title = "Marketing Supervisor",
                Description = "Marketing Team Supervisor",
                Level = PositionLevel.Lead,
                MinSalary = 12000000,
                MaxSalary = 18000000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Positions.AddRangeAsync(positions);
        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Seeded {positions.Count} positions");
        return positions;
    }

    private static async Task<List<Department>> SeedDepartmentsAsync(ApplicationDbContext context)
    {
        var departments = new List<Department>
        {
            new Department
            {
                Id = Guid.NewGuid(),
                Code = "IT",
                Name = "Information Technology",
                Description = "IT infrastructure, software development, and technical support",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Department
            {
                Id = Guid.NewGuid(),
                Code = "HR",
                Name = "Human Resources",
                Description = "Employee management, recruitment, and training",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Department
            {
                Id = Guid.NewGuid(),
                Code = "FIN",
                Name = "Finance",
                Description = "Financial planning, accounting, and budgeting",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Department
            {
                Id = Guid.NewGuid(),
                Code = "SALES",
                Name = "Sales",
                Description = "Sales operations and customer relations",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Department
            {
                Id = Guid.NewGuid(),
                Code = "MKT",
                Name = "Marketing",
                Description = "Marketing campaigns and brand management",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Department
            {
                Id = Guid.NewGuid(),
                Code = "OPS",
                Name = "Operations",
                Description = "Business operations and process management",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Departments.AddRangeAsync(departments);
        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Seeded {departments.Count} departments");
        return departments;
    }

    private static async Task<List<Employee>> SeedEmployeesAsync(
        ApplicationDbContext context,
        List<Department> departments,
        List<Position> positions)
    {
        var itDept = departments.First(d => d.Code == "IT");
        var hrDept = departments.First(d => d.Code == "HR");
        var finDept = departments.First(d => d.Code == "FIN");
        var salesDept = departments.First(d => d.Code == "SALES");
        var mktDept = departments.First(d => d.Code == "MKT");
        var opsDept = departments.First(d => d.Code == "OPS");

        var itDir = positions.First(p => p.Code == "IT-DIR");
        var itMgr = positions.First(p => p.Code == "IT-MGR");
        var devSr = positions.First(p => p.Code == "DEV-SR");
        var devMid = positions.First(p => p.Code == "DEV-MID");
        var devJr = positions.First(p => p.Code == "DEV-JR");
        var hrMgr = positions.First(p => p.Code == "HR-MGR");
        var hrSpv = positions.First(p => p.Code == "HR-SPV");
        var finMgr = positions.First(p => p.Code == "FIN-MGR");
        var accSr = positions.First(p => p.Code == "ACC-SR");
        var salesMgr = positions.First(p => p.Code == "SALES-MGR");
        var mktSpv = positions.First(p => p.Code == "MKT-SPV");

        var employees = new List<Employee>
        {
            // IT Department
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP001",
                FirstName = "Budi",
                LastName = "Santoso",
                Email = "budi.santoso@company.com",
                Phone = "081234567801",
                DateOfBirth = DateTime.SpecifyKind(new DateTime(1985, 3, 15), DateTimeKind.Utc),
                HireDate = DateTime.SpecifyKind(new DateTime(2020, 1, 15), DateTimeKind.Utc),
                DepartmentId = itDept.Id,
                PositionId = itDir.Id,
                Salary = 35000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Sudirman No. 123",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP002",
                FirstName = "Siti",
                LastName = "Rahmawati",
                Email = "siti.rahmawati@company.com",
                Phone = "081234567802",
                DateOfBirth = Utc(1988, 7, 20),
                HireDate = Utc(2020, 6, 1),
                DepartmentId = itDept.Id,
                PositionId = itMgr.Id,
                Salary = 22000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Thamrin No. 45",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP003",
                FirstName = "Ahmad",
                LastName = "Hidayat",
                Email = "ahmad.hidayat@company.com",
                Phone = "081234567803",
                DateOfBirth = Utc(1990, 5, 10),
                HireDate = Utc(2021, 3, 15),
                DepartmentId = itDept.Id,
                PositionId = devSr.Id,
                Salary = 18000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Gatot Subroto No. 67",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP004",
                FirstName = "Dewi",
                LastName = "Lestari",
                Email = "dewi.lestari@company.com",
                Phone = "081234567804",
                DateOfBirth = Utc(1992, 8, 25),
                HireDate = Utc(2022, 1, 10),
                DepartmentId = itDept.Id,
                PositionId = devMid.Id,
                Salary = 13000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Kuningan No. 89",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP005",
                FirstName = "Rudi",
                LastName = "Hartono",
                Email = "rudi.hartono@company.com",
                Phone = "081234567805",
                DateOfBirth = Utc(1995, 11, 30),
                HireDate = Utc(2023, 6, 1),
                DepartmentId = itDept.Id,
                PositionId = devJr.Id,
                Salary = 8000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Rasuna Said No. 12",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            // HR Department
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP006",
                FirstName = "Linda",
                LastName = "Wijaya",
                Email = "linda.wijaya@company.com",
                Phone = "081234567806",
                DateOfBirth = Utc(1987, 4, 18),
                HireDate = Utc(2020, 2, 1),
                DepartmentId = hrDept.Id,
                PositionId = hrMgr.Id,
                Salary = 20000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. HR Rasuna Said No. 34",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP007",
                FirstName = "Andi",
                LastName = "Prasetyo",
                Email = "andi.prasetyo@company.com",
                Phone = "081234567807",
                DateOfBirth = Utc(1991, 9, 12),
                HireDate = Utc(2021, 5, 15),
                DepartmentId = hrDept.Id,
                PositionId = hrSpv.Id,
                Salary = 12000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Senopati No. 56",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            // Finance Department
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP008",
                FirstName = "Rina",
                LastName = "Kusuma",
                Email = "rina.kusuma@company.com",
                Phone = "081234567808",
                DateOfBirth = Utc(1986, 6, 22),
                HireDate = Utc(2019, 8, 1),
                DepartmentId = finDept.Id,
                PositionId = finMgr.Id,
                Salary = 23000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Casablanca No. 78",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP009",
                FirstName = "Hendra",
                LastName = "Gunawan",
                Email = "hendra.gunawan@company.com",
                Phone = "081234567809",
                DateOfBirth = Utc(1989, 12, 5),
                HireDate = Utc(2020, 10, 1),
                DepartmentId = finDept.Id,
                PositionId = accSr.Id,
                Salary = 15000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Menteng No. 90",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            // Sales Department
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP010",
                FirstName = "Dian",
                LastName = "Permata",
                Email = "dian.permata@company.com",
                Phone = "081234567810",
                DateOfBirth = Utc(1988, 2, 14),
                HireDate = Utc(2020, 4, 1),
                DepartmentId = salesDept.Id,
                PositionId = salesMgr.Id,
                Salary = 20000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Kemang No. 23",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            // Marketing Department
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP011",
                FirstName = "Yoga",
                LastName = "Pratama",
                Email = "yoga.pratama@company.com",
                Phone = "081234567811",
                DateOfBirth = Utc(1990, 10, 8),
                HireDate = Utc(2021, 2, 15),
                DepartmentId = mktDept.Id,
                PositionId = mktSpv.Id,
                Salary = 15000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Blok M No. 45",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            },
            // Operations Department
            new Employee
            {
                Id = Guid.NewGuid(),
                EmployeeNumber = "EMP012",
                FirstName = "Maya",
                LastName = "Sari",
                Email = "maya.sari@company.com",
                Phone = "081234567812",
                DateOfBirth = Utc(1993, 7, 19),
                HireDate = Utc(2022, 3, 1),
                DepartmentId = opsDept.Id,
                PositionId = devMid.Id,
                Salary = 12000000,
                Status = EmployeeStatus.Active,
                Address = "Jl. Tebet No. 67",
                City = "Jakarta",
                Country = "Indonesia",
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Employees.AddRangeAsync(employees);
        await context.SaveChangesAsync();
        Console.WriteLine($"✅ Seeded {employees.Count} employees");
        return employees;
    }

    private static async Task UpdateDepartmentManagersAsync(
        ApplicationDbContext context,
        List<Department> departments,
        List<Employee> employees)
    {
        // Assign managers to departments
        var itDept = departments.First(d => d.Code == "IT");
        var hrDept = departments.First(d => d.Code == "HR");
        var finDept = departments.First(d => d.Code == "FIN");
        var salesDept = departments.First(d => d.Code == "SALES");
        var mktDept = departments.First(d => d.Code == "MKT");

        itDept.ManagerId = employees.First(e => e.EmployeeNumber == "EMP002").Id; // Siti (IT Manager)
        hrDept.ManagerId = employees.First(e => e.EmployeeNumber == "EMP006").Id; // Linda (HR Manager)
        finDept.ManagerId = employees.First(e => e.EmployeeNumber == "EMP008").Id; // Rina (Finance Manager)
        salesDept.ManagerId = employees.First(e => e.EmployeeNumber == "EMP010").Id; // Dian (Sales Manager)
        mktDept.ManagerId = employees.First(e => e.EmployeeNumber == "EMP011").Id; // Yoga (Marketing Supervisor)

        await context.SaveChangesAsync();
        Console.WriteLine("✅ Updated department managers");
    }
}


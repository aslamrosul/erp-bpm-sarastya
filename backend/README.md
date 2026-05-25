# 🔧 ERPBPM Backend - ASP.NET Core Web API

RESTful API backend untuk sistem ERPBPM menggunakan ASP.NET Core 8.0 dengan Clean Architecture.

---

## 📋 Deskripsi

Backend API yang menyediakan endpoints untuk:
- Authentication & Authorization (JWT)
- HRM (Human Resource Management)
- Project Management
- Task Management
- Dashboard & Analytics
- User Management

---

## 🏗️ Arsitektur

### Clean Architecture Layers

```
ERPBPM.API/              # Presentation Layer
├── Controllers/         # API Endpoints
├── Middleware/          # Custom Middleware
├── Extensions/          # Service Extensions
└── Filters/            # Action Filters

ERPBPM.Application/      # Application Layer
├── Services/           # Business Logic
├── DTOs/               # Data Transfer Objects
├── Interfaces/         # Service Interfaces
├── Validators/         # FluentValidation
└── Mapping/            # AutoMapper Profiles

ERPBPM.Domain/          # Domain Layer
├── Entities/           # Domain Models
├── Enums/              # Enumerations
└── Common/             # Base Classes

ERPBPM.Infrastructure/   # Infrastructure Layer
├── Persistence/        # DbContext, Migrations
├── Repositories/       # Data Access
├── Data/               # Seeders
└── Queries/            # Raw SQL Queries
```

### Design Patterns

- **Repository Pattern** - Data access abstraction
- **Dependency Injection** - Loose coupling
- **CQRS** - Command Query Responsibility Segregation
- **Middleware Pattern** - Request/Response pipeline
- **DTO Pattern** - Data transfer optimization

---

## 🛠️ Tech Stack

- **Framework**: ASP.NET Core 8.0
- **Database**: PostgreSQL 15
- **ORM**: Entity Framework Core 8.0
- **Authentication**: JWT Bearer Token
- **Validation**: FluentValidation
- **Logging**: Serilog (Console + File)
- **API Documentation**: Swagger/OpenAPI
- **Mapping**: AutoMapper

### NuGet Packages

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
<PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.0" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
<PackageReference Include="FluentValidation.AspNetCore" Version="11.3.0" />
<PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
<PackageReference Include="Serilog.AspNetCore" Version="8.0.0" />
```

---

## 🚀 Setup & Installation

### Prerequisites

- .NET 8.0 SDK
- PostgreSQL 15+
- Visual Studio 2022 / VS Code / Rider

### 1. Clone & Restore

```bash
cd backend
dotnet restore
```

### 2. Database Configuration

Edit `src/ERPBPM.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=erpbpm;Username=postgres;Password=root"
  },
  "JwtSettings": {
    "Secret": "your-secret-key-min-32-characters-long",
    "Issuer": "ERPBPM.API",
    "Audience": "ERPBPM.Client",
    "ExpiryMinutes": 60
  }
}
```

### 3. Create Database

```bash
# Database akan otomatis dibuat saat aplikasi pertama kali dijalankan
# Seeder akan otomatis mengisi data awal
```

### 4. Run Application

```bash
dotnet run --project src/ERPBPM.API
```

Server akan berjalan di:
- HTTP: `http://localhost:5000`
- Swagger UI: `http://localhost:5000/swagger`

---

## 📡 API Endpoints

### Authentication

```http
POST   /api/auth/register          # Register user baru
POST   /api/auth/login             # Login dan dapatkan JWT token
POST   /api/auth/refresh           # Refresh token
GET    /api/auth/me                # Get current user info
```

### Users

```http
GET    /api/users                  # Get all users
GET    /api/users/{id}             # Get user by ID
PUT    /api/users/{id}             # Update user
DELETE /api/users/{id}             # Delete user
```

### Employees (HRM)

```http
GET    /api/employees              # Get all employees
GET    /api/employees/{id}         # Get employee by ID
POST   /api/employees              # Create employee
PUT    /api/employees/{id}         # Update employee
DELETE /api/employees/{id}         # Delete employee
GET    /api/employees/department/{id}  # Get by department
```

### Departments

```http
GET    /api/departments            # Get all departments
GET    /api/departments/{id}       # Get department by ID
POST   /api/departments            # Create department
PUT    /api/departments/{id}       # Update department
DELETE /api/departments/{id}       # Delete department
```

### Positions

```http
GET    /api/positions              # Get all positions
GET    /api/positions/{id}         # Get position by ID
POST   /api/positions              # Create position
PUT    /api/positions/{id}         # Update position
DELETE /api/positions/{id}         # Delete position
```

### Projects

```http
GET    /api/projects               # Get all projects
GET    /api/projects/{id}          # Get project by ID
POST   /api/projects               # Create project
PUT    /api/projects/{id}          # Update project
DELETE /api/projects/{id}          # Delete project
GET    /api/projects/{id}/tasks    # Get project tasks
```

### Tasks

```http
GET    /api/tasks                  # Get all tasks
GET    /api/tasks/{id}             # Get task by ID
POST   /api/tasks                  # Create task
PUT    /api/tasks/{id}             # Update task
DELETE /api/tasks/{id}             # Delete task
GET    /api/tasks?projectId={id}  # Get tasks by project
PUT    /api/tasks/{id}/status      # Update task status
```

### Dashboard

```http
GET    /api/dashboard/stats        # Get dashboard statistics
GET    /api/dashboard/recent-activities  # Get recent activities
```

### Health Check

```http
GET    /api/health                 # Health check endpoint
```

---

## 🔐 Authentication

API menggunakan JWT Bearer Token authentication.

### 1. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@erpbpm.com",
  "password": "Admin123!"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "expiresIn": 3600,
  "user": {
    "id": "...",
    "email": "admin@erpbpm.com",
    "fullName": "Admin User",
    "role": "Admin"
  }
}
```

### 2. Use Token

```http
GET /api/employees
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Database Schema

### Core Tables

- **Users** - User accounts dan authentication
- **Roles** - User roles (Admin, Manager, Employee)
- **Employees** - Employee information
- **Departments** - Company departments
- **Positions** - Job positions
- **Projects** - Project management
- **ProjectMembers** - Project team members
- **TaskItems** - Task management
- **Workflows** - Business process workflows

### Relationships

```
Users 1---* Employees
Departments 1---* Employees
Positions 1---* Employees
Projects 1---* TaskItems
Projects *---* Employees (via ProjectMembers)
Users 1---* TaskItems (AssignedTo)
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Database
ConnectionStrings__DefaultConnection=Host=localhost;Database=erpbpm;Username=postgres;Password=root

# JWT
JwtSettings__Secret=your-secret-key-min-32-characters-long
JwtSettings__Issuer=ERPBPM.API
JwtSettings__Audience=ERPBPM.Client
JwtSettings__ExpiryMinutes=60

# Environment
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:5000
```

### CORS Configuration

Edit `src/ERPBPM.API/Extensions/ServiceExtensions.cs`:

```csharp
services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .WithOrigins(
                "http://localhost:5173",  // Frontend Web Dev
                "http://localhost:3000",  // Alternative port
                "https://your-frontend.com"  // Production
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});
```

---

## 📝 Logging

Aplikasi menggunakan Serilog untuk logging.

### Log Levels

- **Information** - Request/Response logging
- **Warning** - Validation errors
- **Error** - Exceptions dan errors
- **Debug** - Development debugging

### Log Files

Logs disimpan di: `backend/logs/log-YYYYMMDD.txt`

### View Logs

```bash
# Real-time logs
tail -f logs/log-20260525.txt

# Search errors
grep "Error" logs/log-*.txt
```

---

## 🧪 Testing

### Run Tests

```bash
dotnet test
```

### Test Coverage

```bash
dotnet test /p:CollectCoverage=true
```

### Manual Testing

Gunakan Swagger UI: `http://localhost:5000/swagger`

---

## 🐳 Docker

### Build Image

```bash
docker build -t erpbpm-backend .
```

### Run Container

```bash
docker run -d \
  -p 5000:5000 \
  -e ConnectionStrings__DefaultConnection="Host=host.docker.internal;Database=erpbpm;Username=postgres;Password=root" \
  -e JwtSettings__Secret="your-secret-key-min-32-characters-long" \
  --name erpbpm-backend \
  erpbpm-backend
```

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=erpbpm;Username=postgres;Password=root
      - JwtSettings__Secret=your-secret-key-min-32-characters-long
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=erpbpm
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=root
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 🚀 Deployment

### Production Build

```bash
dotnet publish -c Release -o ./publish
```

### Deploy to Render

Lihat [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)

---

## 🔍 Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Test connection
psql -h localhost -U postgres -d erpbpm
```

### Port Already in Use

```bash
# Change port in launchSettings.json
# Or use environment variable
export ASPNETCORE_URLS=http://+:5001
```

### JWT Token Invalid

- Check secret key length (min 32 characters)
- Verify token expiry time
- Check clock synchronization

---

## 📚 Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

---

## 🤝 Contributing

1. Create feature branch
2. Follow coding standards
3. Add unit tests
4. Update documentation
5. Submit pull request

---

**Backend API by ERPBPM Team**

# ERPBPM Backend API

.NET 8.0 Web API with Clean Architecture

## Architecture

- **ERPBPM.API** - Web API layer (Controllers, Middleware)
- **ERPBPM.Application** - Business logic (Services, DTOs, Validators)
- **ERPBPM.Domain** - Domain entities and enums
- **ERPBPM.Infrastructure** - Data access, external services

## Setup

```bash
cd backend
dotnet restore
dotnet ef database update --project src/ERPBPM.Infrastructure --startup-project src/ERPBPM.API
dotnet run --project src/ERPBPM.API
```

## API Documentation

Swagger UI available at: `http://localhost:5000/swagger`

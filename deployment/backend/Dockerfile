# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files
COPY ["backend/src/ERPBPM.API/ERPBPM.API.csproj", "src/ERPBPM.API/"]
COPY ["backend/src/ERPBPM.Application/ERPBPM.Application.csproj", "src/ERPBPM.Application/"]
COPY ["backend/src/ERPBPM.Domain/ERPBPM.Domain.csproj", "src/ERPBPM.Domain/"]
COPY ["backend/src/ERPBPM.Infrastructure/ERPBPM.Infrastructure.csproj", "src/ERPBPM.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "src/ERPBPM.API/ERPBPM.API.csproj"

# Copy all backend source
COPY backend/. .

# Move to API project
WORKDIR "/src/src/ERPBPM.API"

# Build project
RUN dotnet build "ERPBPM.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "ERPBPM.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

EXPOSE 5000

# Environment
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

# Copy published files
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "ERPBPM.API.dll"]
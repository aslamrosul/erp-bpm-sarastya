# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["src/ERPBPM.API/ERPBPM.API.csproj", "src/ERPBPM.API/"]
COPY ["src/ERPBPM.Application/ERPBPM.Application.csproj", "src/ERPBPM.Application/"]
COPY ["src/ERPBPM.Domain/ERPBPM.Domain.csproj", "src/ERPBPM.Domain/"]
COPY ["src/ERPBPM.Infrastructure/ERPBPM.Infrastructure.csproj", "src/ERPBPM.Infrastructure/"]

RUN dotnet restore "src/ERPBPM.API/ERPBPM.API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/src/ERPBPM.API"
RUN dotnet build "ERPBPM.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "ERPBPM.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 5000

# Copy published files
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "ERPBPM.API.dll"]

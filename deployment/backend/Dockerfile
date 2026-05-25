FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/ERPBPM.API/ERPBPM.API.csproj", "src/ERPBPM.API/"]
COPY ["src/ERPBPM.Application/ERPBPM.Application.csproj", "src/ERPBPM.Application/"]
COPY ["src/ERPBPM.Domain/ERPBPM.Domain.csproj", "src/ERPBPM.Domain/"]
COPY ["src/ERPBPM.Infrastructure/ERPBPM.Infrastructure.csproj", "src/ERPBPM.Infrastructure/"]
RUN dotnet restore "src/ERPBPM.API/ERPBPM.API.csproj"
COPY . .
WORKDIR "/src/src/ERPBPM.API"
RUN dotnet build "ERPBPM.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ERPBPM.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ERPBPM.API.dll"]

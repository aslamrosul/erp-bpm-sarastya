namespace ERPBPM.Application.Interfaces.Infrastructure;

public interface IJwtTokenGenerator
{
    string GenerateToken(string userId, string username, string email);
}

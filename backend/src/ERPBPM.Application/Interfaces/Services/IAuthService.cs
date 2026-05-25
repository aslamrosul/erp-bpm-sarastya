using ERPBPM.Application.DTOs.Auth;

namespace ERPBPM.Application.Interfaces.Services;

public interface IAuthService
{
    Task<object> LoginAsync(LoginDto dto);
    Task<object> RegisterAsync(RegisterDto dto);
}

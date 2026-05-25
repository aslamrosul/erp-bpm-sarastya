using ERPBPM.Application.DTOs.Auth;
using ERPBPM.Application.DTOs.User;
using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Application.Interfaces.Infrastructure;
using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Services;

public class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _userRepository.GetByUsernameAsync(dto.Username);
        
        if (user == null)
            throw new UnauthorizedAccessException("Invalid username or password");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid username or password");

        if (!user.IsActive)
            throw new UnauthorizedAccessException("User account is inactive");

        var token = _jwtTokenGenerator.GenerateToken(
            user.Id.ToString(),
            user.Username,
            user.Email
        );

        return new AuthResponseDto
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsActive = user.IsActive
            }
        };
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        // Check if username exists
        var existingUser = await _userRepository.GetByUsernameAsync(dto.Username);
        if (existingUser != null)
            throw new InvalidOperationException("Username already exists");

        // Check if email exists
        var existingEmail = await _userRepository.GetByEmailAsync(dto.Email);
        if (existingEmail != null)
            throw new InvalidOperationException("Email already exists");

        // Create new user
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = dto.Username,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await _userRepository.CreateAsync(user);

        // Generate token
        var token = _jwtTokenGenerator.GenerateToken(
            user.Id.ToString(),
            user.Username,
            user.Email
        );

        return new AuthResponseDto
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsActive = user.IsActive
            }
        };
    }

    public async Task<UserDto> GetCurrentUserAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        
        if (user == null)
            throw new KeyNotFoundException("User not found");

        return new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            IsActive = user.IsActive
        };
    }
}

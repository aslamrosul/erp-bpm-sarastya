using ERPBPM.Application.DTOs.User;
using ERPBPM.Application.Interfaces.Repositories;
using ERPBPM.Domain.Entities;

namespace ERPBPM.Application.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return users.Select(u => new UserDto
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email,
            FirstName = u.FirstName,
            LastName = u.LastName,
            IsActive = u.IsActive
        });
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return null;

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

    public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
    {
        // Check if username exists
        var existingUser = await _userRepository.GetByUsernameAsync(dto.Username);
        if (existingUser != null)
            throw new InvalidOperationException("Username already exists");

        // Check if email exists
        var existingEmail = await _userRepository.GetByEmailAsync(dto.Email);
        if (existingEmail != null)
            throw new InvalidOperationException("Email already exists");

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = dto.Username,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            IsActive = dto.IsActive ?? true,
            CreatedAt = DateTime.UtcNow
        };

        await _userRepository.CreateAsync(user);

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

    public async Task<UserDto> UpdateUserAsync(Guid id, UpdateUserDto dto)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            throw new KeyNotFoundException("User not found");

        // Check if username is taken by another user
        if (dto.Username != user.Username)
        {
            var existingUser = await _userRepository.GetByUsernameAsync(dto.Username);
            if (existingUser != null && existingUser.Id != id)
                throw new InvalidOperationException("Username already exists");
        }

        // Check if email is taken by another user
        if (dto.Email != user.Email)
        {
            var existingEmail = await _userRepository.GetByEmailAsync(dto.Email);
            if (existingEmail != null && existingEmail.Id != id)
                throw new InvalidOperationException("Email already exists");
        }

        user.Username = dto.Username;
        user.Email = dto.Email;
        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.IsActive = dto.IsActive;
        user.UpdatedAt = DateTime.UtcNow;

        // Update password if provided
        if (!string.IsNullOrEmpty(dto.Password))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        await _userRepository.UpdateAsync(user);

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

    public async Task<bool> DeleteUserAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            return false;

        await _userRepository.DeleteAsync(id);
        return true;
    }
}

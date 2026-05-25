namespace ERPBPM.Application.Interfaces.Infrastructure;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendEmailAsync(string to, string subject, string body, bool isHtml);
    Task SendBulkEmailAsync(IEnumerable<string> recipients, string subject, string body);
}

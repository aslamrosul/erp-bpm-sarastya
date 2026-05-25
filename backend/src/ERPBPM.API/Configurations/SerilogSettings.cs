namespace ERPBPM.API.Configurations;

public class SerilogSettings
{
    public string MinimumLevel { get; set; } = "Information";
    public string OutputTemplate { get; set; } = "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}";
    public bool WriteToConsole { get; set; } = true;
    public bool WriteToFile { get; set; } = true;
    public string LogFilePath { get; set; } = "logs/log-.txt";
}

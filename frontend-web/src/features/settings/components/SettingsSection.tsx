interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

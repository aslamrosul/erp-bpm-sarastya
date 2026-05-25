interface WorkflowCardProps {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  version: number;
}

export default function WorkflowCard({ name, description, status, version }: WorkflowCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{name}</h3>
        <span className={`px-2 py-1 text-xs rounded ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-gray-500">Version {version}</p>
    </div>
  );
}

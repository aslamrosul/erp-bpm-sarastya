interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
}

export default function ProjectCard({ name, description, status, progress }: ProjectCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{name}</h3>
        <span className={`px-2 py-1 text-xs rounded ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

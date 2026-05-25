interface EmployeeCardProps {
  name: string;
  position: string;
  department: string;
  email: string;
  avatar?: string;
}

export default function EmployeeCard({ name, position, department, email, avatar }: EmployeeCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full rounded-full" />
        ) : (
          <span className="text-xl font-semibold text-gray-600">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{position}</p>
        <p className="text-xs text-gray-500">{department}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
    </div>
  );
}

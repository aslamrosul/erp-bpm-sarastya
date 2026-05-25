interface CustomerCardProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'Active' | 'Inactive';
}

export default function CustomerCard({ name, email, phone, company, status }: CustomerCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold">{name}</h3>
          {company && <p className="text-sm text-gray-600">{company}</p>}
        </div>
        <span className={`px-2 py-1 text-xs rounded ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-600">{phone}</p>
      </div>
    </div>
  );
}

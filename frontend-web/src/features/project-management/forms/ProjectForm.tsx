import { useState } from 'react';
import { CreateProjectDto } from '../types/project.types';
import { toISODateUTC, fromISODateUTC } from '@/shared/utils/date.utils';

interface ProjectFormProps {
  onSubmit: (data: CreateProjectDto) => void;
  initialData?: Partial<CreateProjectDto>;
}

export default function ProjectForm({ onSubmit, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectDto>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    startDate: initialData?.startDate ? fromISODateUTC(initialData.startDate) : '',
    endDate: initialData?.endDate ? fromISODateUTC(initialData.endDate) : '',
    ownerId: initialData?.ownerId || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert dates to ISO 8601 UTC format before submitting
    const dataToSubmit = {
      ...formData,
      startDate: formData.startDate ? toISODateUTC(formData.startDate) : undefined,
      endDate: formData.endDate ? toISODateUTC(formData.endDate) : undefined,
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Project Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Save Project
      </button>
    </form>
  );
}

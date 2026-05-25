import { useState } from 'react';
import { usePositions } from '../hooks/usePositions';
import Button from '@/shared/components/buttons/Button';
import Card from '@/shared/components/cards/Card';
import Badge from '@/shared/components/badges/Badge';
import { Position, CreatePositionDto, UpdatePositionDto } from '../types/position.types';

export const PositionsPage = () => {
  const { positions, isLoading, createPosition, updatePosition, deletePosition } = usePositions();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState<CreatePositionDto>({
    code: '',
    title: '',
    description: '',
    level: 'mid',
    minSalary: 0,
    maxSalary: 0,
    isActive: true,
  });

  const filteredPositions = positions.filter((pos) =>
    pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pos.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'director':
        return 'danger';
      case 'manager':
        return 'warning';
      case 'lead':
      case 'senior':
        return 'info';
      case 'mid':
        return 'success';
      case 'junior':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleOpenModal = (position?: Position) => {
    if (position) {
      setEditingPosition(position);
      setFormData({
        code: position.code,
        title: position.title,
        description: position.description || '',
        level: position.level,
        minSalary: position.minSalary,
        maxSalary: position.maxSalary,
        isActive: position.isActive,
      });
    } else {
      setEditingPosition(null);
      setFormData({
        code: '',
        title: '',
        description: '',
        level: 'mid',
        minSalary: 0,
        maxSalary: 0,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPosition(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPosition) {
        await updatePosition(editingPosition.id, formData as UpdatePositionDto);
      } else {
        await createPosition(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save position:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      try {
        await deletePosition(id);
      } catch (error) {
        console.error('Failed to delete position:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading positions...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Positions</h1>
          <p className="text-gray-600">Manage job positions and levels</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add Position
        </Button>
      </div>

      <Card>
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Search positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Level
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Salary Range
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Employees
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPositions.map((position) => (
                  <tr key={position.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {position.code}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {position.title}
                        </div>
                        {position.description && (
                          <div className="text-sm text-gray-500">
                            {position.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getLevelColor(position.level)}>
                        {position.level}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div>{formatCurrency(position.minSalary)}</div>
                      <div className="text-gray-500">
                        to {formatCurrency(position.maxSalary)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {position.employeeCount}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={position.isActive ? 'success' : 'danger'}>
                        {position.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(position)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(position.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No positions found
            </div>
          )}
        </div>
      </Card>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md border-2 border-gray-300">
            <h2 className="text-xl font-bold mb-4">
              {editingPosition ? 'Edit Position' : 'Add Position'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., DEV-SR"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Senior Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Position description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level *
                </label>
                <select
                  required
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="junior">Junior</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                  <option value="manager">Manager</option>
                  <option value="director">Director</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Salary *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.minSalary}
                    onChange={(e) =>
                      setFormData({ ...formData, minSalary: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Salary *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.maxSalary}
                    onChange={(e) =>
                      setFormData({ ...formData, maxSalary: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingPosition ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

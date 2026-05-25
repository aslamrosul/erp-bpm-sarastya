import { useState } from 'react';
import { useDepartments } from '../hooks/useDepartments';
import { useEmployees } from '../hooks/useEmployees';
import Button from '@/shared/components/buttons/Button';
import Card from '@/shared/components/cards/Card';
import Badge from '@/shared/components/badges/Badge';
import { Department, CreateDepartmentDto, UpdateDepartmentDto } from '../types/department.types';

export const DepartmentsPage = () => {
  const { departments, isLoading, createDepartment, updateDepartment, deleteDepartment } = useDepartments();
  const { employees } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState<CreateDepartmentDto>({
    code: '',
    name: '',
    description: '',
    managerId: undefined,
    isActive: true,
  });

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (department?: Department) => {
    if (department) {
      setEditingDepartment(department);
      setFormData({
        code: department.code,
        name: department.name,
        description: department.description || '',
        managerId: department.managerId || undefined,
        isActive: department.isActive,
      });
    } else {
      setEditingDepartment(null);
      setFormData({
        code: '',
        name: '',
        description: '',
        managerId: undefined,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDepartment) {
        await updateDepartment(editingDepartment.id, formData as UpdateDepartmentDto);
      } else {
        await createDepartment(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save department:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
      } catch (error) {
        console.error('Failed to delete department:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading departments...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600">Manage organizational departments</p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add Department
        </Button>
      </div>

      <Card>
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDepartments.map((department) => (
              <Card key={department.id}>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {department.name}
                      </h3>
                      <p className="text-sm text-gray-500">{department.code}</p>
                    </div>
                    <Badge variant={department.isActive ? 'success' : 'danger'}>
                      {department.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  {department.description && (
                    <p className="text-sm text-gray-600">{department.description}</p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{department.employeeCount}</span> employees
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(department)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(department.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {department.managerName && (
                    <div className="text-sm text-gray-600">
                      Manager: <span className="font-medium">{department.managerName}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No departments found
            </div>
          )}
        </div>
      </Card>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md border-2 border-gray-300">
            <h2 className="text-xl font-bold mb-4">
              {editingDepartment ? 'Edit Department' : 'Add Department'}
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
                  placeholder="e.g., IT, HR, FIN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Information Technology"
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
                  rows={3}
                  placeholder="Department description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manager
                </label>
                <select
                  value={formData.managerId || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, managerId: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">No Manager</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>
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
                  {editingDepartment ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

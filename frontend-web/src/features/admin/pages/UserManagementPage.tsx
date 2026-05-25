import { useState } from 'react';
import { Search, Plus, Edit, Trash2, MoreVertical } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
}

const users: User[] = [
  { id: 1, name: 'Budi Santoso', email: 'budi.santoso@sarastya.id', role: 'Manager', department: 'Sales', status: 'active' },
  { id: 2, name: 'Siti Nurhaliza', email: 'siti.nurhaliza@sarastya.id', role: 'Staff', department: 'Finance', status: 'active' },
  { id: 3, name: 'Ahmad Fauzi', email: 'ahmad.fauzi@sarastya.id', role: 'Admin', department: 'IT', status: 'active' },
  { id: 4, name: 'Rina Wijaya', email: 'rina.wijaya@sarastya.id', role: 'Staff', department: 'HR', status: 'active' },
  { id: 5, name: 'Dedi Kurniawan', email: 'dedi.kurniawan@sarastya.id', role: 'Supervisor', department: 'Operations', status: 'active' },
  { id: 6, name: 'Maya Anggraini', email: 'maya.anggraini@sarastya.id', role: 'Manager', department: 'Marketing', status: 'active' },
  { id: 7, name: 'Farhan Pratama', email: 'farhan.pratama@sarastya.id', role: 'Staff', department: 'Procurement', status: 'inactive' },
  { id: 8, name: 'Lisa Permata', email: 'lisa.permata@sarastya.id', role: 'Staff', department: 'Finance', status: 'active' },
];

const roleColors: { [key: string]: 'success' | 'danger' | 'warning' | 'info' } = {
  Admin: 'danger',
  Manager: 'info',
  Supervisor: 'warning',
  Staff: 'success',
};

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    return matchesSearch && matchesRole && matchesDepartment;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Application Config</span>
        <span>/</span>
        <span>Users & Companies</span>
        <span>/</span>
        <span className="text-foreground">Users</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">User Management</h1>
          <p className="text-sm text-muted-foreground">Kelola pengguna dan hak akses sistem</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah User
        </Button>
      </div>

      <Card>
        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari nama, email, atau departemen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
            >
              <option value="all">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Staff">Staff</option>
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
            >
              <option value="all">Semua Departemen</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
              <option value="Procurement">Procurement</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Menampilkan {filteredUsers.length} dari {users.length} pengguna</span>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm">
                  <input type="checkbox" className="w-4 h-4 accent-[#7B2D8B]" />
                </th>
                <th className="text-left py-3 px-4 text-sm">Nama</th>
                <th className="text-left py-3 px-4 text-sm">Email</th>
                <th className="text-left py-3 px-4 text-sm">Role</th>
                <th className="text-left py-3 px-4 text-sm">Departemen</th>
                <th className="text-left py-3 px-4 text-sm">Status</th>
                <th className="text-left py-3 px-4 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-secondary transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <input type="checkbox" className="w-4 h-4 accent-[#7B2D8B]" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={roleColors[user.role]}>{user.role}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">{user.department}</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="More">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Halaman 1 dari 1
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-secondary transition-colors text-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#7B2D8B] text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-secondary transition-colors text-sm disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

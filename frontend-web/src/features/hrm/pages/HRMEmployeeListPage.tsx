import { useState } from 'react';
import { Search, Grid, List, Phone, Mail, MapPin, Plus, Filter } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Employee {
  id: number;
  name: string;
  nik: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    nik: 'EMP001',
    position: 'Sales Manager',
    department: 'Sales',
    email: 'budi.santoso@sarastya.id',
    phone: '+62 812-3456-7890',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    nik: 'EMP002',
    position: 'Finance Staff',
    department: 'Finance',
    email: 'siti.nurhaliza@sarastya.id',
    phone: '+62 813-4567-8901',
    status: 'active',
    joinDate: '2024-02-20',
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    nik: 'EMP003',
    position: 'IT Administrator',
    department: 'IT',
    email: 'ahmad.fauzi@sarastya.id',
    phone: '+62 814-5678-9012',
    status: 'active',
    joinDate: '2023-11-10',
  },
  {
    id: 4,
    name: 'Rina Wijaya',
    nik: 'EMP004',
    position: 'HR Specialist',
    department: 'HR',
    email: 'rina.wijaya@sarastya.id',
    phone: '+62 815-6789-0123',
    status: 'active',
    joinDate: '2024-03-05',
  },
  {
    id: 5,
    name: 'Dedi Kurniawan',
    nik: 'EMP005',
    position: 'Operations Supervisor',
    department: 'Operations',
    email: 'dedi.kurniawan@sarastya.id',
    phone: '+62 816-7890-1234',
    status: 'active',
    joinDate: '2023-08-12',
  },
  {
    id: 6,
    name: 'Maya Anggraini',
    nik: 'EMP006',
    position: 'Marketing Manager',
    department: 'Marketing',
    email: 'maya.anggraini@sarastya.id',
    phone: '+62 817-8901-2345',
    status: 'active',
    joinDate: '2023-06-20',
  },
  {
    id: 7,
    name: 'Farhan Pratama',
    nik: 'EMP007',
    position: 'Procurement Staff',
    department: 'Procurement',
    email: 'farhan.pratama@sarastya.id',
    phone: '+62 818-9012-3456',
    status: 'inactive',
    joinDate: '2024-01-08',
  },
  {
    id: 8,
    name: 'Lisa Permata',
    nik: 'EMP008',
    position: 'Finance Staff',
    department: 'Finance',
    email: 'lisa.permata@sarastya.id',
    phone: '+62 819-0123-4567',
    status: 'active',
    joinDate: '2024-04-10',
  },
];

const departments = ['Semua Departemen', 'Sales', 'Finance', 'IT', 'HR', 'Operations', 'Marketing', 'Procurement'];

export default function HRMEmployeeListPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Semua Departemen');

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'Semua Departemen' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>HR (SDM)</span>
        <span>/</span>
        <span className="text-foreground">Karyawan</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Daftar Karyawan</h1>
          <p className="text-sm text-muted-foreground">Total {employees.length} karyawan</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Karyawan
        </Button>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDepartment(dept)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              selectedDepartment === dept
                ? 'bg-[#7B2D8B] text-white'
                : 'bg-white border border-border hover:bg-secondary'
            }`}
          >
            {dept}
            {dept === 'Semua Departemen' && ` (${employees.length})`}
            {dept !== 'Semua Departemen' &&
              ` (${employees.filter((e) => e.department === dept).length})`}
          </button>
        ))}
      </div>

      <Card>
        {/* Toolbar */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama, NIK, atau jabatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex items-center gap-2"
            >
              <Grid className="w-4 h-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              Table
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="border border-border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-2xl mb-3">
                    {employee.name.charAt(0)}
                  </div>
                  <h3 className="text-base mb-1">{employee.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{employee.nik}</p>
                  <Badge variant={employee.status === 'active' ? 'success' : 'danger'}>
                    {employee.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs">{employee.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs">{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-xs text-[#7B2D8B] hover:underline truncate"
                    >
                      {employee.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs">{employee.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm">NIK</th>
                  <th className="text-left py-3 px-4 text-sm">Nama</th>
                  <th className="text-left py-3 px-4 text-sm">Jabatan</th>
                  <th className="text-left py-3 px-4 text-sm">Departemen</th>
                  <th className="text-left py-3 px-4 text-sm">Email</th>
                  <th className="text-left py-3 px-4 text-sm">Telepon</th>
                  <th className="text-left py-3 px-4 text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-sm">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-border hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 text-sm">{employee.nik}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">
                          {employee.name.charAt(0)}
                        </div>
                        <span className="text-sm">{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{employee.position}</td>
                    <td className="py-3 px-4 text-sm">{employee.department}</td>
                    <td className="py-3 px-4 text-sm text-[#7B2D8B]">{employee.email}</td>
                    <td className="py-3 px-4 text-sm">{employee.phone}</td>
                    <td className="py-3 px-4">
                      <Badge variant={employee.status === 'active' ? 'success' : 'danger'}>
                        {employee.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{employee.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

import { Briefcase } from 'lucide-react';

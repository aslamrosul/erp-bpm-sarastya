import { useState } from 'react';
import { Search, Plus, Users, Briefcase } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Department {
  id: number;
  name: string;
  manager: string;
  employeeCount: number;
  budget: number;
  status: 'active' | 'inactive';
}

const departments: Department[] = [
  { id: 1, name: 'Sales', manager: 'Budi Santoso', employeeCount: 12, budget: 500000000, status: 'active' },
  { id: 2, name: 'Finance', manager: 'Siti Nurhaliza', employeeCount: 8, budget: 300000000, status: 'active' },
  { id: 3, name: 'IT', manager: 'Ahmad Fauzi', employeeCount: 15, budget: 600000000, status: 'active' },
  { id: 4, name: 'HR', manager: 'Rina Wijaya', employeeCount: 5, budget: 200000000, status: 'active' },
  { id: 5, name: 'Operations', manager: 'Dedi Kurniawan', employeeCount: 20, budget: 800000000, status: 'active' },
  { id: 6, name: 'Marketing', manager: 'Maya Anggraini', employeeCount: 10, budget: 450000000, status: 'active' },
];

export default function HRDepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>HR (SDM)</span>
        <span>/</span>
        <span className="text-foreground">Departemen</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Departemen</h1>
          <p className="text-sm text-muted-foreground">{departments.length} departemen</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Departemen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Departments</div><div className="text-2xl">{departments.length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Employees</div><div className="text-2xl text-[#7B2D8B]">{departments.reduce((sum, d) => sum + d.employeeCount, 0)}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Budget</div><div className="text-2xl text-green-600">Rp {(departments.reduce((sum, d) => sum + d.budget, 0) / 1000000).toFixed(0)}M</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari departemen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base mb-1">{dept.name}</h3>
                  <Badge variant={dept.status === 'active' ? 'success' : 'danger'}>{dept.status}</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Manager:</span><span>{dept.manager}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Employees:</span><span>{dept.employeeCount} orang</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Budget:</span><span className="text-[#7B2D8B]">Rp {(dept.budget / 1000000).toFixed(0)}M</span></div>
              </div>
              <Button variant="secondary" size="sm" className="w-full">Detail</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

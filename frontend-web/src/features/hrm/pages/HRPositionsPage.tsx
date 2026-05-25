import { useState } from 'react';
import { Search, Plus, Award } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Position {
  id: number;
  title: string;
  department: string;
  level: 'Entry' | 'Junior' | 'Senior' | 'Manager' | 'Director';
  employeeCount: number;
  minSalary: number;
  maxSalary: number;
}

const positions: Position[] = [
  { id: 1, title: 'Sales Manager', department: 'Sales', level: 'Manager', employeeCount: 3, minSalary: 15000000, maxSalary: 25000000 },
  { id: 2, title: 'Sales Executive', department: 'Sales', level: 'Senior', employeeCount: 9, minSalary: 8000000, maxSalary: 15000000 },
  { id: 3, title: 'Finance Manager', department: 'Finance', level: 'Manager', employeeCount: 2, minSalary: 18000000, maxSalary: 30000000 },
  { id: 4, title: 'Accountant', department: 'Finance', level: 'Senior', employeeCount: 6, minSalary: 7000000, maxSalary: 12000000 },
  { id: 5, title: 'IT Manager', department: 'IT', level: 'Manager', employeeCount: 2, minSalary: 20000000, maxSalary: 35000000 },
  { id: 6, title: 'Software Engineer', department: 'IT', level: 'Senior', employeeCount: 10, minSalary: 10000000, maxSalary: 20000000 },
  { id: 7, title: 'Junior Developer', department: 'IT', level: 'Junior', employeeCount: 3, minSalary: 6000000, maxSalary: 10000000 },
];

export default function HRPositionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Director': return 'danger';
      case 'Manager': return 'warning';
      case 'Senior': return 'info';
      case 'Junior': return 'success';
      case 'Entry': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>HR (SDM)</span>
        <span>/</span>
        <span className="text-foreground">Jabatan</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Jabatan</h1>
          <p className="text-sm text-muted-foreground">{positions.length} posisi</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Jabatan
        </Button>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari jabatan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Jabatan</th><th className="text-left py-3 px-4 text-sm">Department</th><th className="text-left py-3 px-4 text-sm">Level</th><th className="text-left py-3 px-4 text-sm">Employees</th><th className="text-left py-3 px-4 text-sm">Salary Range</th></tr></thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><Award className="w-4 h-4 text-[#7B2D8B]" /><span className="text-sm">{position.title}</span></div></td>
                  <td className="py-3 px-4 text-sm">{position.department}</td>
                  <td className="py-3 px-4"><Badge variant={getLevelColor(position.level) as any}>{position.level}</Badge></td>
                  <td className="py-3 px-4 text-sm">{position.employeeCount} orang</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(position.minSalary / 1000000).toFixed(0)}M - {(position.maxSalary / 1000000).toFixed(0)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

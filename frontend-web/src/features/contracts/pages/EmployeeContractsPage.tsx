import { useState } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

const contracts = [
  { id: 1, employee: 'Budi Santoso', type: 'Permanent', startDate: '2024-01-15', endDate: null, status: 'active' },
  { id: 2, employee: 'Siti Nurhaliza', type: 'Permanent', startDate: '2024-02-20', endDate: null, status: 'active' },
  { id: 3, employee: 'Ahmad Fauzi', type: 'Contract', startDate: '2023-11-10', endDate: '2026-11-10', status: 'active' },
];

export default function EmployeeContractsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Contracts (Kontrak)</span>
        <span>/</span>
        <span className="text-foreground">Kontrak Karyawan</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Kontrak Karyawan</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Contract
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Employee</th><th className="text-left py-3 px-4 text-sm">Type</th><th className="text-left py-3 px-4 text-sm">Start Date</th><th className="text-left py-3 px-4 text-sm">End Date</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{contract.employee}</td>
                  <td className="py-3 px-4"><Badge variant={contract.type === 'Permanent' ? 'success' : 'info'}>{contract.type}</Badge></td>
                  <td className="py-3 px-4 text-sm">{contract.startDate}</td>
                  <td className="py-3 px-4 text-sm">{contract.endDate || '-'}</td>
                  <td className="py-3 px-4"><Badge variant="success">{contract.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

const contracts = [
  { id: 1, customer: 'PT ABC Corporation', type: 'Service Agreement', startDate: '2026-01-01', endDate: '2027-01-01', value: 500000000, status: 'active' },
  { id: 2, customer: 'PT Teknologi Nusantara', type: 'License Agreement', startDate: '2025-06-01', endDate: '2026-06-01', value: 300000000, status: 'active' },
];

export default function CustomerContractsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Contracts (Kontrak)</span>
        <span>/</span>
        <span className="text-foreground">Kontrak Pelanggan</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Kontrak Pelanggan</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Contract
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Customer</th><th className="text-left py-3 px-4 text-sm">Type</th><th className="text-left py-3 px-4 text-sm">Start Date</th><th className="text-left py-3 px-4 text-sm">End Date</th><th className="text-left py-3 px-4 text-sm">Value</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{contract.customer}</td>
                  <td className="py-3 px-4 text-sm">{contract.type}</td>
                  <td className="py-3 px-4 text-sm">{contract.startDate}</td>
                  <td className="py-3 px-4 text-sm">{contract.endDate}</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(contract.value / 1000000).toFixed(0)}M</td>
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

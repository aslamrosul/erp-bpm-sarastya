import { useState } from 'react';
import { Search, Plus, FileText, Clock } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface PurchaseRequest {
  id: string;
  requestedBy: string;
  department: string;
  date: string;
  items: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'ordered';
}

const purchaseRequests: PurchaseRequest[] = [
  { id: 'PR-2026-0156', requestedBy: 'Ahmad Fauzi', department: 'IT', date: '2026-05-05', items: 2, totalAmount: 15000000, status: 'pending' },
  { id: 'PR-2026-0155', requestedBy: 'Rina Wijaya', department: 'HR', date: '2026-05-03', items: 5, totalAmount: 5000000, status: 'approved' },
  { id: 'PR-2026-0154', requestedBy: 'Siti Nurhaliza', department: 'Finance', date: '2026-05-01', items: 3, totalAmount: 8500000, status: 'ordered' },
];

export default function PurchaseRequestPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Purchases (Pembelian)</span>
        <span>/</span>
        <span className="text-foreground">Purchase Request</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Purchase Request</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buat PR Baru
        </Button>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari nomor PR atau department..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">No. PR</th><th className="text-left py-3 px-4 text-sm">Requested By</th><th className="text-left py-3 px-4 text-sm">Department</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Items</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {purchaseRequests.map((pr) => (
                <tr key={pr.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{pr.id}</td>
                  <td className="py-3 px-4 text-sm">{pr.requestedBy}</td>
                  <td className="py-3 px-4 text-sm">{pr.department}</td>
                  <td className="py-3 px-4 text-sm">{pr.date}</td>
                  <td className="py-3 px-4 text-sm">{pr.items} items</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(pr.totalAmount / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4"><Badge variant={pr.status === 'approved' ? 'success' : pr.status === 'pending' ? 'warning' : 'info'}>{pr.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

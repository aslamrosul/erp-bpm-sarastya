import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface PurchaseOrder {
  id: string;
  supplier: string;
  prNumber: string;
  date: string;
  deliveryDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'confirmed' | 'received';
}

const purchaseOrders: PurchaseOrder[] = [
  { id: 'PO-2026-0089', supplier: 'PT Teknologi Maju', prNumber: 'PR-2026-0155', date: '2026-05-04', deliveryDate: '2026-05-18', amount: 15000000, status: 'sent' },
  { id: 'PO-2026-0088', supplier: 'CV Supplies Indonesia', prNumber: 'PR-2026-0154', date: '2026-05-02', deliveryDate: '2026-05-15', amount: 8500000, status: 'confirmed' },
];

export default function PurchaseOrderPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Purchases (Pembelian)</span>
        <span>/</span>
        <span className="text-foreground">Purchase Order</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Purchase Order</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buat PO Baru
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">No. PO</th><th className="text-left py-3 px-4 text-sm">Supplier</th><th className="text-left py-3 px-4 text-sm">PR Number</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Delivery Date</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{po.id}</td>
                  <td className="py-3 px-4 text-sm">{po.supplier}</td>
                  <td className="py-3 px-4 text-sm">{po.prNumber}</td>
                  <td className="py-3 px-4 text-sm">{po.date}</td>
                  <td className="py-3 px-4 text-sm">{po.deliveryDate}</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(po.amount / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4"><Badge variant={po.status === 'confirmed' ? 'success' : 'info'}>{po.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

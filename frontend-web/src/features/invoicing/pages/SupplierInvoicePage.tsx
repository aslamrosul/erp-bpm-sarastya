import { useState } from 'react';
import { Search, Plus, CheckCircle, DollarSign, Calendar } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface SupplierInvoice {
  id: string;
  supplier: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  poNumber: string;
}

const supplierInvoices: SupplierInvoice[] = [
  { id: 'SINV-2026-0089', supplier: 'PT Teknologi Maju', invoiceDate: '2026-05-04', dueDate: '2026-05-18', amount: 15000000, paid: 15000000, status: 'paid', poNumber: 'PO-2026-0089' },
  { id: 'SINV-2026-0090', supplier: 'CV Supplies Indonesia', invoiceDate: '2026-05-05', dueDate: '2026-05-19', amount: 8500000, paid: 0, status: 'approved', poNumber: 'PO-2026-0088' },
  { id: 'SINV-2026-0091', supplier: 'PT Furnitur Berkah', invoiceDate: '2026-05-06', dueDate: '2026-05-20', amount: 12000000, paid: 0, status: 'pending', poNumber: 'PO-2026-0087' },
];

export default function SupplierInvoicePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const totalAmount = supplierInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = supplierInvoices.reduce((sum, inv) => sum + inv.paid, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Invoicing (Faktur)</span>
        <span>/</span>
        <span className="text-foreground">Supplier Invoice</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Supplier Invoice</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Input Invoice Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Payable</div><div className="text-2xl text-[#7B2D8B]">Rp {(totalAmount / 1000000).toFixed(0)}M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Paid</div><div className="text-2xl text-green-600">Rp {(totalPaid / 1000000).toFixed(0)}M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Outstanding</div><div className="text-2xl text-amber-500">Rp {((totalAmount - totalPaid) / 1000000).toFixed(0)}M</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari invoice supplier..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Invoice No.</th><th className="text-left py-3 px-4 text-sm">Supplier</th><th className="text-left py-3 px-4 text-sm">PO Number</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Due Date</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {supplierInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{inv.id}</td>
                  <td className="py-3 px-4 text-sm">{inv.supplier}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{inv.poNumber}</td>
                  <td className="py-3 px-4 text-sm">{inv.invoiceDate}</td>
                  <td className="py-3 px-4 text-sm">{inv.dueDate}</td>
                  <td className="py-3 px-4 text-sm">Rp {(inv.amount / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4"><Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'approved' ? 'info' : inv.status === 'pending' ? 'warning' : 'danger'}>{inv.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Search, Plus, DollarSign, CreditCard, Building } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Payment {
  id: string;
  invoiceNumber: string;
  paymentDate: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'cash' | 'credit_card' | 'check';
  reference: string;
  status: 'completed' | 'pending' | 'failed';
  paidBy: string;
}

const payments: Payment[] = [
  { id: 'PAY-2026-0234', invoiceNumber: 'INV-2026-0423', paymentDate: '2026-05-02', amount: 125000000, paymentMethod: 'bank_transfer', reference: 'TRF20260502001', status: 'completed', paidBy: 'PT ABC Corporation' },
  { id: 'PAY-2026-0235', invoiceNumber: 'INV-2026-0424', paymentDate: '2026-05-04', amount: 100000000, paymentMethod: 'bank_transfer', reference: 'TRF20260504002', status: 'completed', paidBy: 'PT Teknologi Nusantara' },
  { id: 'PAY-2026-0236', invoiceNumber: 'SINV-2026-0089', paymentDate: '2026-05-05', amount: 15000000, paymentMethod: 'bank_transfer', reference: 'TRF20260505003', status: 'pending', paidBy: 'PT Sarastya (to Supplier)' },
];

export default function PaymentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer': return <Building className="w-4 h-4" />;
      case 'credit_card': return <CreditCard className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Invoicing (Faktur)</span>
        <span>/</span>
        <span className="text-foreground">Pembayaran</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Pembayaran</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Catat Pembayaran
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Payments</div><div className="text-2xl text-[#7B2D8B]">Rp {(totalPayments / 1000000).toFixed(0)}M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Completed</div><div className="text-2xl text-green-600">{payments.filter(p => p.status === 'completed').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Pending</div><div className="text-2xl text-amber-500">{payments.filter(p => p.status === 'pending').length}</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari payment..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Payment No.</th><th className="text-left py-3 px-4 text-sm">Invoice</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Paid By/To</th><th className="text-left py-3 px-4 text-sm">Method</th><th className="text-left py-3 px-4 text-sm">Reference</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{payment.id}</td>
                  <td className="py-3 px-4 text-sm">{payment.invoiceNumber}</td>
                  <td className="py-3 px-4 text-sm">{payment.paymentDate}</td>
                  <td className="py-3 px-4 text-sm">{payment.paidBy}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2 text-sm">{getMethodIcon(payment.paymentMethod)}<span>{payment.paymentMethod.replace('_', ' ')}</span></div></td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{payment.reference}</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(payment.amount / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4"><Badge variant={payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}>{payment.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

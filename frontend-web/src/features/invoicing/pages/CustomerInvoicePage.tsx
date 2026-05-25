import { useState } from 'react';
import { Search, Plus, Send, Download, Eye, DollarSign, Calendar } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Invoice {
  id: string;
  customer: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue';
  items: number;
  soNumber: string;
}

const invoices: Invoice[] = [
  { id: 'INV-2026-0423', customer: 'PT ABC Corporation', invoiceDate: '2026-05-01', dueDate: '2026-05-15', amount: 125000000, paid: 125000000, status: 'paid', items: 5, soNumber: 'SO-2026-0512' },
  { id: 'INV-2026-0424', customer: 'PT Teknologi Nusantara', invoiceDate: '2026-05-03', dueDate: '2026-05-17', amount: 250000000, paid: 100000000, status: 'partial', items: 8, soNumber: 'SO-2026-0511' },
  { id: 'INV-2026-0425', customer: 'CV Mandiri Jaya', invoiceDate: '2026-05-05', dueDate: '2026-05-19', amount: 85000000, paid: 0, status: 'sent', items: 3, soNumber: 'SO-2026-0510' },
  { id: 'INV-2026-0426', customer: 'PT Indo Berkah', invoiceDate: '2026-04-20', dueDate: '2026-05-04', amount: 320000000, paid: 0, status: 'overdue', items: 12, soNumber: 'SO-2026-0498' },
];

export default function CustomerInvoicePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || inv.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'sent': return 'info';
      case 'partial': return 'warning';
      case 'paid': return 'success';
      case 'overdue': return 'danger';
      default: return 'default';
    }
  };

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalOutstanding = totalInvoiced - totalPaid;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Invoicing (Faktur)</span>
        <span>/</span>
        <span className="text-foreground">Customer Invoice</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Customer Invoice</h1>
          <p className="text-sm text-muted-foreground">{invoices.length} invoice</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buat Invoice Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="flex items-start justify-between"><div><div className="text-sm text-muted-foreground mb-1">Total Invoiced</div><div className="text-2xl">Rp {(totalInvoiced / 1000000).toFixed(0)}M</div></div><div className="w-10 h-10 bg-[#7B2D8B] rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-white" /></div></div></Card>
        <Card><div className="flex items-start justify-between"><div><div className="text-sm text-muted-foreground mb-1">Total Paid</div><div className="text-2xl text-green-600">Rp {(totalPaid / 1000000).toFixed(0)}M</div></div><div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-white" /></div></div></Card>
        <Card><div className="flex items-start justify-between"><div><div className="text-sm text-muted-foreground mb-1">Outstanding</div><div className="text-2xl text-amber-500">Rp {(totalOutstanding / 1000000).toFixed(0)}M</div></div><div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-white" /></div></div></Card>
        <Card><div className="flex items-start justify-between"><div><div className="text-sm text-muted-foreground mb-1">Overdue</div><div className="text-2xl text-red-600">{invoices.filter((i) => i.status === 'overdue').length}</div></div><div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center"><Calendar className="w-5 h-5 text-white" /></div></div></Card>
      </div>

      <Card>
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari nomor invoice atau customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]">
            <option value="all">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="partial">Partial Payment</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Invoice No.</th><th className="text-left py-3 px-4 text-sm">Customer</th><th className="text-left py-3 px-4 text-sm">SO Number</th><th className="text-left py-3 px-4 text-sm">Invoice Date</th><th className="text-left py-3 px-4 text-sm">Due Date</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Paid</th><th className="text-left py-3 px-4 text-sm">Balance</th><th className="text-left py-3 px-4 text-sm">Status</th><th className="text-left py-3 px-4 text-sm">Aksi</th></tr></thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{invoice.id}</td>
                  <td className="py-3 px-4 text-sm">{invoice.customer}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{invoice.soNumber}</td>
                  <td className="py-3 px-4 text-sm">{invoice.invoiceDate}</td>
                  <td className="py-3 px-4 text-sm">{invoice.dueDate}</td>
                  <td className="py-3 px-4 text-sm">Rp {(invoice.amount / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-sm text-green-600">Rp {(invoice.paid / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-sm text-amber-500">Rp {((invoice.amount - invoice.paid) / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4"><Badge variant={getStatusColor(invoice.status) as any}>{invoice.status}</Badge></td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><button className="p-1.5 hover:bg-secondary rounded transition-colors" title="View"><Eye className="w-4 h-4" /></button><button className="p-1.5 hover:bg-secondary rounded transition-colors" title="Send"><Send className="w-4 h-4" /></button><button className="p-1.5 hover:bg-secondary rounded transition-colors" title="Download"><Download className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

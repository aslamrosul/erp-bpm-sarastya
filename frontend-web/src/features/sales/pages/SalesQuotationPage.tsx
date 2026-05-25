import { useState } from 'react';
import { Search, Plus, Eye, Send, Copy } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Quotation {
  id: string;
  customer: string;
  date: string;
  validUntil: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  items: number;
  createdBy: string;
}

const quotations: Quotation[] = [
  {
    id: 'QUO-2026-001',
    customer: 'PT ABC Corporation',
    date: '2026-05-01',
    validUntil: '2026-05-15',
    amount: 125000000,
    status: 'sent',
    items: 5,
    createdBy: 'Budi Santoso',
  },
  {
    id: 'QUO-2026-002',
    customer: 'PT Teknologi Nusantara',
    date: '2026-05-03',
    validUntil: '2026-05-17',
    amount: 250000000,
    status: 'accepted',
    items: 8,
    createdBy: 'Maya Anggraini',
  },
  {
    id: 'QUO-2026-003',
    customer: 'CV Mandiri Jaya',
    date: '2026-05-04',
    validUntil: '2026-05-18',
    amount: 85000000,
    status: 'draft',
    items: 3,
    createdBy: 'Budi Santoso',
  },
];

export default function SalesQuotationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch = q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'sent': return 'info';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Sales (Penjualan)</span>
        <span>/</span>
        <span className="text-foreground">Quotation / Penawaran</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Quotation / Penawaran</h1>
          <p className="text-sm text-muted-foreground">{quotations.length} penawaran</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buat Quotation Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Draft</div>
          <div className="text-2xl">{quotations.filter((q) => q.status === 'draft').length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Sent</div>
          <div className="text-2xl text-blue-600">{quotations.filter((q) => q.status === 'sent').length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Accepted</div>
          <div className="text-2xl text-green-600">{quotations.filter((q) => q.status === 'accepted').length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Total Value</div>
          <div className="text-2xl text-[#7B2D8B]">
            Rp {(quotations.reduce((sum, q) => sum + q.amount, 0) / 1000000).toFixed(0)}M
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nomor quotation atau customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
          >
            <option value="all">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm">Nomor</th>
                <th className="text-left py-3 px-4 text-sm">Customer</th>
                <th className="text-left py-3 px-4 text-sm">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm">Valid Until</th>
                <th className="text-left py-3 px-4 text-sm">Items</th>
                <th className="text-left py-3 px-4 text-sm">Amount</th>
                <th className="text-left py-3 px-4 text-sm">Status</th>
                <th className="text-left py-3 px-4 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{quotation.id}</td>
                  <td className="py-3 px-4 text-sm">{quotation.customer}</td>
                  <td className="py-3 px-4 text-sm">{quotation.date}</td>
                  <td className="py-3 px-4 text-sm">{quotation.validUntil}</td>
                  <td className="py-3 px-4 text-sm">{quotation.items} items</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">
                    Rp {(quotation.amount / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(quotation.status) as any}>
                      {quotation.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="Send">
                        <Send className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded transition-colors" title="Copy">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

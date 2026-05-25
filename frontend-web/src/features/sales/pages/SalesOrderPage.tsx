import { useState } from 'react';
import { Search, Plus, Package, Truck, CheckCircle } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface SalesOrder {
  id: string;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  amount: number;
  status: 'draft' | 'confirmed' | 'processing' | 'delivered';
  items: number;
}

const salesOrders: SalesOrder[] = [
  { id: 'SO-2026-0512', customer: 'PT ABC Corporation', orderDate: '2026-05-05', deliveryDate: '2026-05-20', amount: 125000000, status: 'confirmed', items: 5 },
  { id: 'SO-2026-0511', customer: 'PT Teknologi Nusantara', orderDate: '2026-05-04', deliveryDate: '2026-05-18', amount: 250000000, status: 'processing', items: 8 },
  { id: 'SO-2026-0510', customer: 'CV Mandiri Jaya', orderDate: '2026-05-03', deliveryDate: '2026-05-15', amount: 85000000, status: 'delivered', items: 3 },
];

export default function SalesOrderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = salesOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Sales (Penjualan)</span>
        <span>/</span>
        <span className="text-foreground">Sales Order</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Sales Order</h1>
          <p className="text-sm text-muted-foreground">{salesOrders.length} order aktif</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buat Sales Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Confirmed</div><div className="text-2xl">{salesOrders.filter((o) => o.status === 'confirmed').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Processing</div><div className="text-2xl text-amber-500">{salesOrders.filter((o) => o.status === 'processing').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Delivered</div><div className="text-2xl text-green-600">{salesOrders.filter((o) => o.status === 'delivered').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Value</div><div className="text-2xl text-[#7B2D8B]">Rp {(salesOrders.reduce((sum, o) => sum + o.amount, 0) / 1000000).toFixed(0)}M</div></Card>
      </div>

      <Card>
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari nomor SO atau customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]">
            <option value="all">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Nomor SO</th><th className="text-left py-3 px-4 text-sm">Customer</th><th className="text-left py-3 px-4 text-sm">Order Date</th><th className="text-left py-3 px-4 text-sm">Delivery Date</th><th className="text-left py-3 px-4 text-sm">Items</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Status</th><th className="text-left py-3 px-4 text-sm">Aksi</th></tr></thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{order.id}</td>
                  <td className="py-3 px-4 text-sm">{order.customer}</td>
                  <td className="py-3 px-4 text-sm">{order.orderDate}</td>
                  <td className="py-3 px-4 text-sm">{order.deliveryDate}</td>
                  <td className="py-3 px-4 text-sm">{order.items} items</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(order.amount / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4"><Badge variant={order.status === 'delivered' ? 'success' : order.status === 'processing' ? 'warning' : 'info'}>{order.status}</Badge></td>
                  <td className="py-3 px-4"><Button variant="secondary" size="sm">Detail</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

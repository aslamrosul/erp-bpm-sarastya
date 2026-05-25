import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../../../shared/components/cards/Card';

const salesData = [
  { month: 'Jan', revenue: 45000000, target: 50000000 },
  { month: 'Feb', revenue: 52000000, target: 55000000 },
  { month: 'Mar', revenue: 48000000, target: 50000000 },
  { month: 'Apr', revenue: 61000000, target: 60000000 },
];

export default function SalesReportPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Sales (Penjualan)</span>
        <span>/</span>
        <span className="text-foreground">Laporan Penjualan</span>
      </div>
      
      <h1 className="text-2xl">Laporan Penjualan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Revenue YTD</div><div className="text-2xl text-[#7B2D8B]">Rp 206M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Avg Order Value</div><div className="text-2xl">Rp 153M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Orders</div><div className="text-2xl">156</div></Card>
      </div>

      <Card title="Revenue vs Target">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
            <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(1)}M`} />
            <Legend />
            <Bar dataKey="revenue" fill="#7B2D8B" name="Revenue" />
            <Bar dataKey="target" fill="#E91E8C" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

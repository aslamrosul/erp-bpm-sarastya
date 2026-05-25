import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';

const profitLossData = [
  { month: 'Jan', revenue: 45000000, expense: 30000000, profit: 15000000 },
  { month: 'Feb', revenue: 52000000, expense: 32000000, profit: 20000000 },
  { month: 'Mar', revenue: 48000000, expense: 28000000, profit: 20000000 },
  { month: 'Apr', revenue: 61000000, expense: 35000000, profit: 26000000 },
];

const balanceSheetData = [
  { name: 'Assets', value: 500000000, color: '#7B2D8B' },
  { name: 'Liabilities', value: 200000000, color: '#E91E8C' },
  { name: 'Equity', value: 300000000, color: '#9D4EDD' },
];

export default function FinancialReportPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Accounting (Akuntansi)</span>
        <span>/</span>
        <span className="text-foreground">Laporan Keuangan</span>
      </div>

      <h1 className="text-2xl">Laporan Keuangan</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Assets</div><div className="text-2xl text-[#7B2D8B]">Rp 500M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Liabilities</div><div className="text-2xl text-[#E91E8C]">Rp 200M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Equity</div><div className="text-2xl text-green-600">Rp 300M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Net Profit (YTD)</div><div className="text-2xl text-green-600">Rp 81M</div></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Profit & Loss (4 Bulan)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profitLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="revenue" fill="#7B2D8B" name="Revenue" />
              <Bar dataKey="expense" fill="#E91E8C" name="Expense" />
              <Bar dataKey="profit" fill="#22c55e" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Balance Sheet">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={balanceSheetData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={(entry) => `${entry.name}: Rp ${(entry.value / 1000000).toFixed(0)}M`}>
                {balanceSheetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(0)}M`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

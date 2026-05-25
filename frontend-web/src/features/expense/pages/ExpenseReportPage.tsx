import { useState } from 'react';
import { Search, Plus, DollarSign, Receipt } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Expense {
  id: string;
  employee: string;
  date: string;
  category: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid';
  description: string;
}

const expenses: Expense[] = [
  { id: 'EXP-2026-012', employee: 'Siti Nurhaliza', date: '2026-05-02', category: 'Travel', amount: 3450000, status: 'approved', description: 'Perjalanan dinas Jakarta' },
  { id: 'EXP-2026-013', employee: 'Ahmad Fauzi', date: '2026-05-04', category: 'Office Supplies', amount: 1250000, status: 'submitted', description: 'Pembelian stationery kantor' },
  { id: 'EXP-2026-014', employee: 'Budi Santoso', date: '2026-05-05', category: 'Entertainment', amount: 2800000, status: 'approved', description: 'Client dinner meeting' },
  { id: 'EXP-2026-015', employee: 'Maya Anggraini', date: '2026-05-06', category: 'Travel', amount: 4200000, status: 'submitted', description: 'Perjalanan dinas Surabaya' },
];

export default function ExpenseReportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const approvedExpense = expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Expense Management</span>
        <span>/</span>
        <span className="text-foreground">Expense Report</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Expense Report</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Submit Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Expense</div><div className="text-2xl text-[#7B2D8B]">Rp {(totalExpense / 1000000).toFixed(1)}M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Approved</div><div className="text-2xl text-green-600">Rp {(approvedExpense / 1000000).toFixed(1)}M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Pending</div><div className="text-2xl text-amber-500">{expenses.filter(e => e.status === 'submitted').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">This Month</div><div className="text-2xl">{expenses.length}</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari expense..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">ID</th><th className="text-left py-3 px-4 text-sm">Employee</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Category</th><th className="text-left py-3 px-4 text-sm">Description</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{expense.id}</td>
                  <td className="py-3 px-4 text-sm">{expense.employee}</td>
                  <td className="py-3 px-4 text-sm">{expense.date}</td>
                  <td className="py-3 px-4"><Badge variant="info">{expense.category}</Badge></td>
                  <td className="py-3 px-4 text-sm">{expense.description}</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(expense.amount / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4"><Badge variant={expense.status === 'approved' ? 'success' : expense.status === 'submitted' ? 'warning' : expense.status === 'rejected' ? 'danger' : 'default'}>{expense.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

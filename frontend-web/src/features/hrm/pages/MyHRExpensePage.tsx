import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';
import { Plus, Receipt } from 'lucide-react';

const myExpenses = [
  { id: 'EXP-2026-012', date: '2026-05-02', category: 'Travel', amount: 3450000, status: 'approved' },
];

export default function MyHRExpensePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>MyHR (Self Service)</span>
        <span>/</span>
        <span className="text-foreground">Expense Saya</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Expense Saya</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Submit Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">This Month</div><div className="text-2xl text-[#7B2D8B]">Rp 3.45M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Approved</div><div className="text-2xl text-green-600">Rp 3.45M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Pending</div><div className="text-2xl text-amber-500">0</div></Card>
      </div>

      <Card title="My Expenses">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">ID</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Category</th><th className="text-left py-3 px-4 text-sm">Amount</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {myExpenses.map((exp) => (
                <tr key={exp.id} className="border-b border-border"><td className="py-3 px-4 text-sm">{exp.id}</td><td className="py-3 px-4 text-sm">{exp.date}</td><td className="py-3 px-4 text-sm">{exp.category}</td><td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(exp.amount / 1000).toFixed(0)}K</td><td className="py-3 px-4"><Badge variant="success">{exp.status}</Badge></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

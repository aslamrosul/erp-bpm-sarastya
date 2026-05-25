import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const budgetData = [
  { department: 'Sales', allocated: 500000000, spent: 450000000, remaining: 50000000 },
  { department: 'IT', allocated: 600000000, spent: 480000000, remaining: 120000000 },
  { department: 'Marketing', allocated: 450000000, spent: 420000000, remaining: 30000000 },
  { department: 'Operations', allocated: 800000000, spent: 750000000, remaining: 50000000 },
];

export default function AccountingBudgetPage() {
  const totalAllocated = budgetData.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgetData.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Accounting (Akuntansi)</span>
        <span>/</span>
        <span className="text-foreground">Budget</span>
      </div>

      <h1 className="text-2xl">Budget Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Allocated</div><div className="text-2xl text-[#7B2D8B]">Rp {(totalAllocated / 1000000000).toFixed(1)}B</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Spent</div><div className="text-2xl text-amber-500">Rp {(totalSpent / 1000000000).toFixed(1)}B</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Remaining</div><div className="text-2xl text-green-600">Rp {(totalRemaining / 1000000).toFixed(0)}M</div></Card>
      </div>

      <Card title="Budget by Department">
        <div className="space-y-4">
          {budgetData.map((budget, idx) => (
            <div key={idx} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-base">{budget.department}</h3>
                </div>
                <Badge variant={budget.remaining > 0 ? 'success' : 'danger'}>
                  {((budget.spent / budget.allocated) * 100).toFixed(0)}% used
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                <div><div className="text-xs text-muted-foreground">Allocated</div><div>Rp {(budget.allocated / 1000000).toFixed(0)}M</div></div>
                <div><div className="text-xs text-muted-foreground">Spent</div><div className="text-amber-500">Rp {(budget.spent / 1000000).toFixed(0)}M</div></div>
                <div><div className="text-xs text-muted-foreground">Remaining</div><div className="text-green-600">Rp {(budget.remaining / 1000000).toFixed(0)}M</div></div>
              </div>
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#7B2D8B] h-2 rounded-full" style={{ width: `${(budget.spent / budget.allocated) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

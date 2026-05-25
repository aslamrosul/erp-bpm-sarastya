import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

const budgetLines = [
  { id: 1, category: 'Salaries', department: 'All', allocated: 1200000000, type: 'Fixed' },
  { id: 2, category: 'Marketing Campaigns', department: 'Marketing', allocated: 300000000, type: 'Variable' },
  { id: 3, category: 'IT Infrastructure', department: 'IT', allocated: 500000000, type: 'Capital' },
  { id: 4, category: 'Travel & Entertainment', department: 'Sales', allocated: 200000000, type: 'Variable' },
];

export default function BudgetLinesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Budget Management</span>
        <span>/</span>
        <span className="text-foreground">Budget Lines</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Budget Lines</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Budget Line
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Category</th><th className="text-left py-3 px-4 text-sm">Department</th><th className="text-left py-3 px-4 text-sm">Type</th><th className="text-left py-3 px-4 text-sm">Allocated</th></tr></thead>
            <tbody>
              {budgetLines.map((line) => (
                <tr key={line.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{line.category}</td>
                  <td className="py-3 px-4 text-sm">{line.department}</td>
                  <td className="py-3 px-4"><Badge variant={line.type === 'Fixed' ? 'success' : line.type === 'Variable' ? 'warning' : 'info'}>{line.type}</Badge></td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">Rp {(line.allocated / 1000000).toFixed(0)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

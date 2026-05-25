import { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

const pendingExpenses = [
  { id: 'EXP-2026-013', employee: 'Ahmad Fauzi', date: '2026-05-04', category: 'Office Supplies', amount: 1250000, description: 'Pembelian stationery kantor' },
  { id: 'EXP-2026-014', employee: 'Maya Anggraini', date: '2026-05-06', category: 'Travel', amount: 4200000, description: 'Perjalanan dinas Surabaya' },
];

export default function ExpenseApprovalPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Expense Management</span>
        <span>/</span>
        <span className="text-foreground">Approval Expense</span>
      </div>

      <h1 className="text-2xl">Expense Approval</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Pending Approval</div><div className="text-2xl text-amber-500">{pendingExpenses.length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Amount</div><div className="text-2xl text-[#7B2D8B]">Rp {(pendingExpenses.reduce((sum, e) => sum + e.amount, 0) / 1000).toFixed(0)}K</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Approved Today</div><div className="text-2xl text-green-600">3</div></Card>
      </div>

      <Card>
        <div className="space-y-3">
          {pendingExpenses.map((expense) => (
            <div key={expense.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div><div className="text-sm mb-1">{expense.id} - {expense.employee}</div><div className="text-xs text-muted-foreground">{expense.category} • {expense.date}</div></div>
                <Badge variant="warning">Pending</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-3">{expense.description}</div>
              <div className="flex items-center justify-between">
                <div className="text-lg text-[#7B2D8B]">Rp {(expense.amount / 1000).toFixed(0)}K</div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />Approve</Button>
                  <Button variant="danger" size="sm" className="flex items-center gap-1"><XCircle className="w-4 h-4" />Reject</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

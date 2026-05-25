import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../../../shared/components/cards/Card';

const budgetVsActual = [
  { department: 'Sales', budget: 500, actual: 450 },
  { department: 'IT', budget: 600, actual: 480 },
  { department: 'Marketing', budget: 450, actual: 420 },
  { department: 'Operations', budget: 800, actual: 750 },
];

export default function BudgetReportPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Budget Management</span>
        <span>/</span>
        <span className="text-foreground">Laporan Budget</span>
      </div>

      <h1 className="text-2xl">Laporan Budget</h1>

      <Card title="Budget vs Actual Spending">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={budgetVsActual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip formatter={(value: number) => `Rp ${value}M`} />
            <Legend />
            <Bar dataKey="budget" fill="#7B2D8B" name="Budget" />
            <Bar dataKey="actual" fill="#E91E8C" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

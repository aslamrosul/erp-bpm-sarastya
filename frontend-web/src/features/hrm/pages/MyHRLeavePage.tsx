import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';
import { Plus, Calendar } from 'lucide-react';

const leaveBalance = [
  { type: 'Annual Leave', total: 12, used: 5, remaining: 7 },
  { type: 'Sick Leave', total: 10, used: 2, remaining: 8 },
  { type: 'Special Leave', total: 3, used: 0, remaining: 3 },
];

const leaveHistory = [
  { id: 1, type: 'Annual Leave', startDate: '2026-04-15', endDate: '2026-04-19', days: 5, status: 'approved' },
];

export default function MyHRLeavePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>MyHR (Self Service)</span>
        <span>/</span>
        <span className="text-foreground">Cuti Saya</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Cuti Saya</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajukan Cuti
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaveBalance.map((leave, idx) => (
          <Card key={idx}><div className="text-sm text-muted-foreground mb-1">{leave.type}</div><div className="text-2xl text-[#7B2D8B] mb-1">{leave.remaining}</div><div className="text-xs text-muted-foreground">dari {leave.total} hari</div></Card>
        ))}
      </div>

      <Card title="Riwayat Cuti">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Type</th><th className="text-left py-3 px-4 text-sm">Period</th><th className="text-left py-3 px-4 text-sm">Days</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {leaveHistory.map((leave) => (
                <tr key={leave.id} className="border-b border-border"><td className="py-3 px-4 text-sm">{leave.type}</td><td className="py-3 px-4 text-sm">{leave.startDate} - {leave.endDate}</td><td className="py-3 px-4 text-sm">{leave.days} days</td><td className="py-3 px-4"><Badge variant="success">{leave.status}</Badge></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

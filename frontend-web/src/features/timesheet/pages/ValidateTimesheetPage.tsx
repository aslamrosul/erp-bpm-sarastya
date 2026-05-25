import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

const pendingTimesheets = [
  { id: 1, employee: 'Ahmad Fauzi', period: '29 Apr - 3 May 2026', totalHours: 40, overtime: 5, status: 'pending' },
  { id: 2, employee: 'Budi Santoso', period: '29 Apr - 3 May 2026', totalHours: 38, overtime: 0, status: 'pending' },
];

export default function ValidateTimesheetPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Timesheet Management</span>
        <span>/</span>
        <span className="text-foreground">Validasi Timesheet</span>
      </div>

      <h1 className="text-2xl">Validasi Timesheet</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Pending Validation</div><div className="text-2xl text-amber-500">{pendingTimesheets.length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Hours</div><div className="text-2xl text-[#7B2D8B]">{pendingTimesheets.reduce((sum, t) => sum + t.totalHours, 0)}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Validated Today</div><div className="text-2xl text-green-600">5</div></Card>
      </div>

      <Card>
        <div className="space-y-3">
          {pendingTimesheets.map((ts) => (
            <div key={ts.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div><div className="text-sm mb-1">{ts.employee}</div><div className="text-xs text-muted-foreground">{ts.period}</div></div>
                <Badge variant="warning">Pending</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div><span className="text-muted-foreground">Total Hours:</span> {ts.totalHours}h</div>
                <div><span className="text-muted-foreground">Overtime:</span> {ts.overtime}h</div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="primary" size="sm" className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />Approve</Button>
                <Button variant="danger" size="sm" className="flex items-center gap-1"><XCircle className="w-4 h-4" />Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

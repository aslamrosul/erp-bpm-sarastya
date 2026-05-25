import { useState } from 'react';
import { Search, Workflow, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';

const processHistory = [
  { id: 'WF-2026-003', workflow: 'Expense Approval', initiator: 'Siti Nurhaliza', startDate: '2026-05-04', endDate: '2026-05-05', status: 'completed', duration: '1 day' },
  { id: 'WF-2026-002', workflow: 'Leave Request', initiator: 'Budi Santoso', startDate: '2026-05-05', endDate: '2026-05-05', status: 'completed', duration: '4 hours' },
];

export default function ProcessHistoryPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>BPM (Workflow)</span>
        <span>/</span>
        <span className="text-foreground">History Proses</span>
      </div>

      <h1 className="text-2xl">History Proses</h1>

      <Card>
        <div className="space-y-3">
          {processHistory.map((process) => (
            <div key={process.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3"><Workflow className="w-5 h-5 text-[#7B2D8B]" /><div><div className="text-sm">{process.workflow}</div><div className="text-xs text-muted-foreground">{process.id}</div></div></div>
                <Badge variant={process.status === 'completed' ? 'success' : 'danger'}>{process.status}</Badge>
              </div>
              <div className="grid grid-cols-4 gap-3 text-sm text-muted-foreground">
                <div>Initiator: {process.initiator}</div>
                <div>Start: {process.startDate}</div>
                <div>End: {process.endDate}</div>
                <div>Duration: {process.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';
import { Play, Clock } from 'lucide-react';

const batches = [
  { id: 1, name: 'Daily Backup', schedule: 'Daily at 02:00 AM', lastRun: '2026-05-06 02:00', status: 'success', duration: '15 min' },
  { id: 2, name: 'Monthly Report Generation', schedule: '1st of every month', lastRun: '2026-05-01 03:00', status: 'success', duration: '30 min' },
  { id: 3, name: 'Database Optimization', schedule: 'Weekly on Sunday', lastRun: '2026-05-04 04:00', status: 'success', duration: '45 min' },
];

export default function AdminBatchesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Administration</span>
        <span>/</span>
        <span className="text-foreground">Batches</span>
      </div>

      <h1 className="text-2xl">Scheduled Batches</h1>

      <Card>
        <div className="space-y-3">
          {batches.map((batch) => (
            <div key={batch.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div><div className="text-sm mb-1">{batch.name}</div><div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{batch.schedule}</div></div>
                <Badge variant={batch.status === 'success' ? 'success' : 'danger'}>{batch.status}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last Run: {batch.lastRun}</span>
                <span>Duration: {batch.duration}</span>
                <Button variant="ghost" size="sm" className="flex items-center gap-1"><Play className="w-3 h-3" />Run Now</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

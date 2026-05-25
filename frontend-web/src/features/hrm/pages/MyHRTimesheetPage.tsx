import Card from '../../../shared/components/cards/Card';
import Button from '../../../shared/components/buttons/Button';
import { Plus, Clock } from 'lucide-react';

export default function MyHRTimesheetPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>MyHR (Self Service)</span>
        <span>/</span>
        <span className="text-foreground">Timesheet Saya</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Timesheet Saya</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Input Timesheet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">This Week</div><div className="text-2xl text-[#7B2D8B]">38 jam</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">This Month</div><div className="text-2xl">152 jam</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Overtime</div><div className="text-2xl text-amber-500">8 jam</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Pending Approval</div><div className="text-2xl">2</div></Card>
      </div>

      <Card>
        <div className="text-center py-12 text-muted-foreground">
          <Clock className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-sm">Silakan input timesheet Anda</p>
        </div>
      </Card>
    </div>
  );
}

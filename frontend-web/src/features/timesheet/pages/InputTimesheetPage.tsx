import { useState } from 'react';
import { Plus, Clock, Calendar, Save } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface TimesheetEntry {
  id: number;
  date: string;
  project: string;
  task: string;
  hours: number;
  description: string;
}

const timesheetEntries: TimesheetEntry[] = [
  { id: 1, date: '2026-05-05', project: 'ERP Implementation', task: 'Backend Development', hours: 8, description: 'API development for purchase module' },
  { id: 2, date: '2026-05-06', project: 'Website Redesign', task: 'Frontend Development', hours: 7, description: 'Homepage redesign implementation' },
  { id: 3, date: '2026-05-07', project: 'ERP Implementation', task: 'Testing', hours: 6, description: 'Unit testing for invoice module' },
];

export default function InputTimesheetPage() {
  const totalHours = timesheetEntries.reduce((sum, e) => sum + e.hours, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Timesheet Management</span>
        <span>/</span>
        <span className="text-foreground">Input Timesheet</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Input Timesheet</h1>
          <p className="text-sm text-muted-foreground">Minggu ini: Total {totalHours} jam</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Pilih Periode
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Hours (Week)</div><div className="text-2xl text-[#7B2D8B]">{totalHours} jam</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Regular Hours</div><div className="text-2xl">{totalHours > 40 ? 40 : totalHours} jam</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Overtime</div><div className="text-2xl text-amber-500">{totalHours > 40 ? totalHours - 40 : 0} jam</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Target (40 hrs)</div><div className="text-2xl text-green-600">{((totalHours / 40) * 100).toFixed(0)}%</div></Card>
      </div>

      <Card title="Timesheet Entries">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Project</th><th className="text-left py-3 px-4 text-sm">Task</th><th className="text-left py-3 px-4 text-sm">Hours</th><th className="text-left py-3 px-4 text-sm">Description</th><th className="text-left py-3 px-4 text-sm">Aksi</th></tr></thead>
            <tbody>
              {timesheetEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{entry.date}</td>
                  <td className="py-3 px-4 text-sm">{entry.project}</td>
                  <td className="py-3 px-4"><Badge variant="info">{entry.task}</Badge></td>
                  <td className="py-3 px-4"><div className="flex items-center gap-1 text-sm text-[#7B2D8B]"><Clock className="w-4 h-4" />{entry.hours}h</div></td>
                  <td className="py-3 px-4 text-sm">{entry.description}</td>
                  <td className="py-3 px-4"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary">Save Draft</Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Submit for Approval
          </Button>
        </div>
      </Card>
    </div>
  );
}

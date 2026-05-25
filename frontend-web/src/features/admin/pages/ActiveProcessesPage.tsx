import { useState } from 'react';
import { Search, Workflow, Clock, CheckCircle } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Process {
  id: string;
  workflow: string;
  initiator: string;
  startDate: string;
  currentStep: string;
  status: 'running' | 'waiting' | 'completed' | 'failed';
  progress: number;
}

const processes: Process[] = [
  { id: 'WF-2026-001', workflow: 'Purchase Approval', initiator: 'Ahmad Fauzi', startDate: '2026-05-05 10:30', currentStep: 'Manager Approval', status: 'waiting', progress: 50 },
  { id: 'WF-2026-002', workflow: 'Leave Request', initiator: 'Budi Santoso', startDate: '2026-05-05 14:20', currentStep: 'HR Approval', status: 'running', progress: 75 },
  { id: 'WF-2026-003', workflow: 'Expense Approval', initiator: 'Siti Nurhaliza', startDate: '2026-05-04 09:15', currentStep: 'Completed', status: 'completed', progress: 100 },
  { id: 'WF-2026-004', workflow: 'Invoice Validation', initiator: 'Maya Anggraini', startDate: '2026-05-03 11:45', currentStep: 'Finance Review', status: 'running', progress: 60 },
];

export default function ActiveProcessesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>BPM (Workflow)</span>
        <span>/</span>
        <span className="text-foreground">Proses Aktif</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Proses Aktif</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Running</div><div className="text-2xl text-[#7B2D8B]">{processes.filter(p => p.status === 'running' || p.status === 'waiting').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Running</div><div className="text-2xl text-blue-600">{processes.filter(p => p.status === 'running').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Waiting</div><div className="text-2xl text-amber-500">{processes.filter(p => p.status === 'waiting').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Completed Today</div><div className="text-2xl text-green-600">{processes.filter(p => p.status === 'completed').length}</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari process..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="space-y-3">
          {processes.map((process) => (
            <div key={process.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{process.workflow}</h3>
                    <div className="text-xs text-muted-foreground">Process ID: {process.id}</div>
                  </div>
                </div>
                <Badge variant={process.status === 'completed' ? 'success' : process.status === 'waiting' ? 'warning' : process.status === 'running' ? 'info' : 'danger'}>{process.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                <div><div className="text-xs text-muted-foreground">Initiator</div><div>{process.initiator}</div></div>
                <div><div className="text-xs text-muted-foreground">Start Date</div><div>{process.startDate}</div></div>
                <div><div className="text-xs text-muted-foreground">Current Step</div><div>{process.currentStep}</div></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{process.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#7B2D8B] h-2 rounded-full transition-all" style={{ width: `${process.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

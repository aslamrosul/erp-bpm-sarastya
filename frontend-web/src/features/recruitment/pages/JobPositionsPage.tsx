import { useState } from 'react';
import { Search, Plus, Briefcase } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  openings: number;
  applicants: number;
  status: 'open' | 'closed' | 'on-hold';
  postedDate: string;
}

const jobPositions: JobPosition[] = [
  { id: 1, title: 'Senior Software Engineer', department: 'IT', type: 'Full-time', openings: 2, applicants: 15, status: 'open', postedDate: '2026-04-15' },
  { id: 2, title: 'Sales Executive', department: 'Sales', type: 'Full-time', openings: 3, applicants: 22, status: 'open', postedDate: '2026-04-20' },
  { id: 3, title: 'HR Specialist', department: 'HR', type: 'Full-time', openings: 1, applicants: 8, status: 'on-hold', postedDate: '2026-04-10' },
  { id: 4, title: 'Marketing Manager', department: 'Marketing', type: 'Full-time', openings: 1, applicants: 12, status: 'open', postedDate: '2026-05-01' },
];

export default function JobPositionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Recruitment</span>
        <span>/</span>
        <span className="text-foreground">Job Positions</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Job Positions</h1>
          <p className="text-sm text-muted-foreground">{jobPositions.filter(j => j.status === 'open').length} posisi terbuka</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Open Positions</div><div className="text-2xl text-[#7B2D8B]">{jobPositions.filter(j => j.status === 'open').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Openings</div><div className="text-2xl">{jobPositions.reduce((sum, j) => sum + j.openings, 0)}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Applicants</div><div className="text-2xl text-green-600">{jobPositions.reduce((sum, j) => sum + j.applicants, 0)}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">On Hold</div><div className="text-2xl text-amber-500">{jobPositions.filter(j => j.status === 'on-hold').length}</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari job position..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobPositions.map((job) => (
            <div key={job.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm mb-1">{job.title}</h3>
                    <div className="text-xs text-muted-foreground">{job.department}</div>
                  </div>
                </div>
                <Badge variant={job.status === 'open' ? 'success' : job.status === 'closed' ? 'danger' : 'warning'}>{job.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                <div><div className="text-xs text-muted-foreground">Type</div><Badge variant="info">{job.type}</Badge></div>
                <div><div className="text-xs text-muted-foreground">Openings</div><div>{job.openings}</div></div>
                <div><div className="text-xs text-muted-foreground">Applicants</div><div className="text-green-600">{job.applicants}</div></div>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Posted: {job.postedDate}</span>
                <Button variant="secondary" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

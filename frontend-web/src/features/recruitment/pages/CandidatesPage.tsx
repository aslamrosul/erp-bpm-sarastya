import { useState } from 'react';
import { Search, Plus, User, Mail, Phone } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
  appliedDate: string;
  rating: number;
}

const candidates: Candidate[] = [
  { id: 1, name: 'Andi Wijaya', email: 'andi@email.com', phone: '+62 812-1111-2222', position: 'Senior Software Engineer', stage: 'Interview', appliedDate: '2026-04-20', rating: 4 },
  { id: 2, name: 'Dewi Lestari', email: 'dewi@email.com', phone: '+62 813-3333-4444', position: 'Sales Executive', stage: 'Screening', appliedDate: '2026-04-25', rating: 5 },
  { id: 3, name: 'Rizki Prasetyo', email: 'rizki@email.com', phone: '+62 814-5555-6666', position: 'Senior Software Engineer', stage: 'Offer', appliedDate: '2026-04-18', rating: 5 },
  { id: 4, name: 'Sarah Permata', email: 'sarah@email.com', phone: '+62 815-7777-8888', position: 'Marketing Manager', stage: 'Applied', appliedDate: '2026-05-02', rating: 3 },
];

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Hired': return 'success';
      case 'Offer': return 'info';
      case 'Interview': return 'warning';
      case 'Screening': return 'info';
      case 'Applied': return 'default';
      case 'Rejected': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Recruitment</span>
        <span>/</span>
        <span className="text-foreground">Kandidat</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Kandidat</h1>
          <p className="text-sm text-muted-foreground">{candidates.length} kandidat</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Candidate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Applied</div><div className="text-2xl">{candidates.filter(c => c.stage === 'Applied').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Screening</div><div className="text-2xl text-blue-600">{candidates.filter(c => c.stage === 'Screening').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Interview</div><div className="text-2xl text-amber-500">{candidates.filter(c => c.stage === 'Interview').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Offer</div><div className="text-2xl text-[#7B2D8B]">{candidates.filter(c => c.stage === 'Offer').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Hired</div><div className="text-2xl text-green-600">{candidates.filter(c => c.stage === 'Hired').length}</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari kandidat..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Name</th><th className="text-left py-3 px-4 text-sm">Position</th><th className="text-left py-3 px-4 text-sm">Contact</th><th className="text-left py-3 px-4 text-sm">Applied Date</th><th className="text-left py-3 px-4 text-sm">Stage</th><th className="text-left py-3 px-4 text-sm">Rating</th><th className="text-left py-3 px-4 text-sm">Aksi</th></tr></thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">{candidate.name.charAt(0)}</div><span className="text-sm">{candidate.name}</span></div></td>
                  <td className="py-3 px-4 text-sm">{candidate.position}</td>
                  <td className="py-3 px-4"><div className="text-xs"><div className="flex items-center gap-1 mb-1"><Mail className="w-3 h-3" />{candidate.email}</div><div className="flex items-center gap-1"><Phone className="w-3 h-3" />{candidate.phone}</div></div></td>
                  <td className="py-3 px-4 text-sm">{candidate.appliedDate}</td>
                  <td className="py-3 px-4"><Badge variant={getStageColor(candidate.stage) as any}>{candidate.stage}</Badge></td>
                  <td className="py-3 px-4 text-sm">{candidate.rating}/5 ⭐</td>
                  <td className="py-3 px-4"><Button variant="secondary" size="sm">View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

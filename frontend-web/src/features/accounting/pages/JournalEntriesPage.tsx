import { useState } from 'react';
import { Search, Plus, BookOpen } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  debit: number;
  credit: number;
  status: 'draft' | 'posted';
}

const journalEntries: JournalEntry[] = [
  { id: 'JE-2026-001', date: '2026-05-01', reference: 'INV-2026-0423', description: 'Sales Invoice PT ABC Corp', debit: 125000000, credit: 0, status: 'posted' },
  { id: 'JE-2026-002', date: '2026-05-02', reference: 'PAY-2026-0234', description: 'Payment from PT ABC Corp', debit: 0, credit: 125000000, status: 'posted' },
  { id: 'JE-2026-003', date: '2026-05-05', reference: 'SINV-2026-0089', description: 'Purchase from PT Teknologi Maju', debit: 0, credit: 15000000, status: 'posted' },
  { id: 'JE-2026-004', date: '2026-05-06', reference: 'EXP-2026-012', description: 'Office Rent May 2026', debit: 25000000, credit: 0, status: 'draft' },
];

export default function JournalEntriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const totalDebit = journalEntries.reduce((sum, je) => sum + je.debit, 0);
  const totalCredit = journalEntries.reduce((sum, je) => sum + je.credit, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Accounting (Akuntansi)</span>
        <span>/</span>
        <span className="text-foreground">Journal Entries</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Journal Entries</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buat Journal Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Debit</div><div className="text-2xl text-[#7B2D8B]">Rp {(totalDebit / 1000000).toFixed(0)}M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Total Credit</div><div className="text-2xl text-green-600">Rp {(totalCredit / 1000000).toFixed(0)}M</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Balance</div><div className="text-2xl">Rp {((totalDebit - totalCredit) / 1000000).toFixed(0)}M</div></Card>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari journal entry..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Entry No.</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Reference</th><th className="text-left py-3 px-4 text-sm">Description</th><th className="text-left py-3 px-4 text-sm">Debit</th><th className="text-left py-3 px-4 text-sm">Credit</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {journalEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{entry.id}</td>
                  <td className="py-3 px-4 text-sm">{entry.date}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{entry.reference}</td>
                  <td className="py-3 px-4 text-sm">{entry.description}</td>
                  <td className="py-3 px-4 text-sm text-[#7B2D8B]">{entry.debit > 0 ? `Rp ${(entry.debit / 1000000).toFixed(1)}M` : '-'}</td>
                  <td className="py-3 px-4 text-sm text-green-600">{entry.credit > 0 ? `Rp ${(entry.credit / 1000000).toFixed(1)}M` : '-'}</td>
                  <td className="py-3 px-4"><Badge variant={entry.status === 'posted' ? 'success' : 'default'}>{entry.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Search, Plus, FolderTree } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Account {
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  parent?: string;
  balance: number;
}

const accounts: Account[] = [
  { code: '1000', name: 'Assets', type: 'Asset', balance: 500000000 },
  { code: '1100', name: 'Current Assets', type: 'Asset', parent: '1000', balance: 300000000 },
  { code: '1110', name: 'Cash and Bank', type: 'Asset', parent: '1100', balance: 150000000 },
  { code: '1120', name: 'Accounts Receivable', type: 'Asset', parent: '1100', balance: 100000000 },
  { code: '2000', name: 'Liabilities', type: 'Liability', balance: 200000000 },
  { code: '2100', name: 'Current Liabilities', type: 'Liability', parent: '2000', balance: 150000000 },
  { code: '3000', name: 'Equity', type: 'Equity', balance: 300000000 },
  { code: '4000', name: 'Revenue', type: 'Revenue', balance: 450000000 },
  { code: '5000', name: 'Expenses', type: 'Expense', balance: 250000000 },
];

export default function ChartOfAccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Asset': return 'success';
      case 'Liability': return 'danger';
      case 'Equity': return 'info';
      case 'Revenue': return 'success';
      case 'Expense': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Accounting (Akuntansi)</span>
        <span>/</span>
        <span className="text-foreground">Chart of Accounts</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Chart of Accounts</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Account
        </Button>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Cari account..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Code</th><th className="text-left py-3 px-4 text-sm">Account Name</th><th className="text-left py-3 px-4 text-sm">Type</th><th className="text-left py-3 px-4 text-sm">Balance</th></tr></thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.code} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{account.code}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><span className={account.parent ? 'ml-8' : ''}>{account.name}</span></div></td>
                  <td className="py-3 px-4"><Badge variant={getTypeColor(account.type) as any}>{account.type}</Badge></td>
                  <td className="py-3 px-4 text-sm">Rp {(account.balance / 1000000).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

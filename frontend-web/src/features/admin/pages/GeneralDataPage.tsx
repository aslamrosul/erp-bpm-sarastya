import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';
import { Database, Plus } from 'lucide-react';

const dataCategories = [
  { id: 1, name: 'Countries', records: 195, lastUpdated: '2026-01-15' },
  { id: 2, name: 'Currencies', records: 50, lastUpdated: '2026-02-20' },
  { id: 3, name: 'Industries', records: 25, lastUpdated: '2026-03-10' },
  { id: 4, name: 'Job Titles', records: 120, lastUpdated: '2026-04-05' },
];

export default function GeneralDataPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Application Config</span>
        <span>/</span>
        <span className="text-foreground">General Data</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">General Data</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataCategories.map((cat) => (
            <div key={cat.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#7B2D8B] flex items-center justify-center text-white">
                  <Database className="w-5 h-5" />
                </div>
                <div><div className="text-sm">{cat.name}</div><div className="text-xs text-muted-foreground">{cat.records} records</div></div>
              </div>
              <div className="text-xs text-muted-foreground">Last updated: {cat.lastUpdated}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';
import { Plus, Workflow } from 'lucide-react';

const stages = [
  { id: 1, name: 'Applied', order: 1, duration: '1 day', candidates: 25 },
  { id: 2, name: 'Screening', order: 2, duration: '3 days', candidates: 15 },
  { id: 3, name: 'Technical Interview', order: 3, duration: '5 days', candidates: 8 },
  { id: 4, name: 'HR Interview', order: 4, duration: '2 days', candidates: 5 },
  { id: 5, name: 'Offer', order: 5, duration: '2 days', candidates: 2 },
];

export default function RecruitmentStagesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Recruitment</span>
        <span>/</span>
        <span className="text-foreground">Tahapan Rekrutmen</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Tahapan Rekrutmen</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Stage
        </Button>
      </div>

      <Card>
        <div className="space-y-3">
          {stages.map((stage) => (
            <div key={stage.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7B2D8B] text-white flex items-center justify-center">{stage.order}</div>
                  <div><div className="text-sm">{stage.name}</div><div className="text-xs text-muted-foreground">Avg Duration: {stage.duration}</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-[#7B2D8B]">{stage.candidates} candidates</div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

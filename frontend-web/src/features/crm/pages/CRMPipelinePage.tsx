import { DollarSign, User, Calendar, Plus, TrendingUp } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Deal {
  id: number;
  company: string;
  value: number;
  salesperson: string;
  dueDate: string;
  probability: number;
}

interface PipelineStage {
  id: string;
  name: string;
  deals: Deal[];
  color: string;
}

const pipelineData: PipelineStage[] = [
  {
    id: 'prospek',
    name: 'Prospek',
    color: 'bg-gray-100',
    deals: [
      {
        id: 1,
        company: 'PT Maju Jaya',
        value: 125000000,
        salesperson: 'Budi Santoso',
        dueDate: '2026-05-15',
        probability: 20,
      },
      {
        id: 2,
        company: 'CV Sentosa Abadi',
        value: 85000000,
        salesperson: 'Maya Anggraini',
        dueDate: '2026-05-20',
        probability: 15,
      },
    ],
  },
  {
    id: 'kualifikasi',
    name: 'Kualifikasi',
    color: 'bg-blue-50',
    deals: [
      {
        id: 3,
        company: 'PT Teknologi Nusantara',
        value: 250000000,
        salesperson: 'Budi Santoso',
        dueDate: '2026-05-18',
        probability: 40,
      },
      {
        id: 4,
        company: 'PT Global Solutions',
        value: 180000000,
        salesperson: 'Maya Anggraini',
        dueDate: '2026-05-25',
        probability: 35,
      },
    ],
  },
  {
    id: 'proposal',
    name: 'Proposal',
    color: 'bg-purple-50',
    deals: [
      {
        id: 5,
        company: 'PT Indo Berkah',
        value: 320000000,
        salesperson: 'Budi Santoso',
        dueDate: '2026-05-12',
        probability: 60,
      },
    ],
  },
  {
    id: 'negosiasi',
    name: 'Negosiasi',
    color: 'bg-amber-50',
    deals: [
      {
        id: 6,
        company: 'PT Cahaya Mandiri',
        value: 450000000,
        salesperson: 'Maya Anggraini',
        dueDate: '2026-05-10',
        probability: 75,
      },
      {
        id: 7,
        company: 'CV Sukses Makmur',
        value: 275000000,
        salesperson: 'Budi Santoso',
        dueDate: '2026-05-14',
        probability: 70,
      },
    ],
  },
  {
    id: 'won',
    name: 'Won',
    color: 'bg-green-50',
    deals: [
      {
        id: 8,
        company: 'PT Sejahtera Corp',
        value: 580000000,
        salesperson: 'Maya Anggraini',
        dueDate: '2026-05-01',
        probability: 100,
      },
    ],
  },
  {
    id: 'lost',
    name: 'Lost',
    color: 'bg-red-50',
    deals: [
      {
        id: 9,
        company: 'PT Competitor Win',
        value: 150000000,
        salesperson: 'Budi Santoso',
        dueDate: '2026-04-28',
        probability: 0,
      },
    ],
  },
];

const formatCurrency = (value: number) => {
  return `Rp ${(value / 1000000).toFixed(0)}M`;
};

export default function CRMPipelinePage() {
  const totalValue = pipelineData.reduce(
    (acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0),
    0
  );

  const wonValue = pipelineData
    .find((stage) => stage.id === 'won')
    ?.deals.reduce((sum, deal) => sum + deal.value, 0) || 0;

  const totalDeals = pipelineData.reduce((acc, stage) => acc + stage.deals.length, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>CRM</span>
        <span>/</span>
        <span className="text-foreground">Pipeline Sales</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Sales Pipeline</h1>
          <p className="text-sm text-muted-foreground">Kelola dan pantau progress sales deals</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Deal
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Pipeline Value</p>
              <p className="text-2xl">{formatCurrency(totalValue)}</p>
            </div>
            <div className="w-12 h-12 bg-[#7B2D8B] rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Won This Month</p>
              <p className="text-2xl text-green-600">{formatCurrency(wonValue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Deals</p>
              <p className="text-2xl">{totalDeals}</p>
            </div>
            <div className="w-12 h-12 bg-[#E91E8C] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Win Rate</p>
              <p className="text-2xl">
                {totalDeals > 0 ? ((wonValue / totalValue) * 100).toFixed(0) : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {pipelineData.map((stage) => (
            <div key={stage.id} className="w-80 flex-shrink-0">
              <Card>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm">{stage.name}</h3>
                    <Badge variant="default">{stage.deals.length}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(stage.deals.reduce((sum, deal) => sum + deal.value, 0))}
                  </div>
                </div>

                <div className="space-y-3 min-h-[400px]">
                  {stage.deals.map((deal) => (
                    <div
                      key={deal.id}
                      className={`${stage.color} border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}
                    >
                      <h4 className="text-sm mb-3">{deal.company}</h4>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-[#7B2D8B]">{formatCurrency(deal.value)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">
                              {deal.salesperson.charAt(0)}
                            </div>
                            <span className="text-xs text-muted-foreground">{deal.salesperson}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{deal.dueDate}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Probability</span>
                          <span className="text-xs">{deal.probability}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-[#7B2D8B] h-1.5 rounded-full transition-all"
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:border-[#7B2D8B] hover:text-[#7B2D8B] transition-colors">
                    + Tambah Deal
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

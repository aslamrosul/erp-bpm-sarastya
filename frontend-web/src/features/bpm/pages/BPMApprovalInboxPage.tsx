import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, User } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Approval {
  id: number;
  type: string;
  title: string;
  requester: string;
  requestDate: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  amount?: string;
  details: { label: string; value: string }[];
}

const approvals: Approval[] = [
  {
    id: 1,
    type: 'Cuti',
    title: 'Pengajuan Cuti Tahunan',
    requester: 'Budi Santoso',
    requestDate: '2026-05-03 14:30',
    priority: 'medium',
    description: 'Pengajuan cuti tahunan untuk keperluan keluarga',
    details: [
      { label: 'Tanggal Mulai', value: '10 Mei 2026' },
      { label: 'Tanggal Selesai', value: '14 Mei 2026' },
      { label: 'Total Hari', value: '5 hari' },
      { label: 'Sisa Cuti', value: '12 hari' },
    ],
  },
  {
    id: 2,
    type: 'Expense',
    title: 'Reimbursement Biaya Perjalanan Dinas',
    requester: 'Siti Nurhaliza',
    requestDate: '2026-05-02 10:15',
    priority: 'high',
    description: 'Reimbursement biaya perjalanan dinas ke Jakarta',
    amount: 'Rp 3.450.000',
    details: [
      { label: 'Tanggal Perjalanan', value: '28-30 April 2026' },
      { label: 'Tujuan', value: 'Jakarta' },
      { label: 'Transportasi', value: 'Rp 2.100.000' },
      { label: 'Akomodasi', value: 'Rp 1.350.000' },
    ],
  },
  {
    id: 3,
    type: 'Purchase Order',
    title: 'Purchase Order Laptop Dell',
    requester: 'Ahmad Fauzi',
    requestDate: '2026-05-01 09:45',
    priority: 'high',
    description: 'Pembelian laptop untuk karyawan baru',
    amount: 'Rp 15.000.000',
    details: [
      { label: 'Item', value: 'Dell XPS 15' },
      { label: 'Quantity', value: '2 unit' },
      { label: 'Supplier', value: 'PT Teknologi Maju' },
      { label: 'Delivery', value: '1-2 minggu' },
    ],
  },
  {
    id: 4,
    type: 'Timesheet',
    title: 'Approval Timesheet Mingguan',
    requester: 'Rina Wijaya',
    requestDate: '2026-04-30 16:20',
    priority: 'low',
    description: 'Approval timesheet untuk minggu 22-26 April 2026',
    details: [
      { label: 'Periode', value: '22-26 April 2026' },
      { label: 'Total Jam', value: '40 jam' },
      { label: 'Proyek', value: 'ERP Implementation' },
      { label: 'Lembur', value: '5 jam' },
    ],
  },
  {
    id: 5,
    type: 'Invoice',
    title: 'Customer Invoice Approval',
    requester: 'Maya Anggraini',
    requestDate: '2026-04-29 11:00',
    priority: 'medium',
    description: 'Approval invoice untuk PT ABC Corporation',
    amount: 'Rp 125.000.000',
    details: [
      { label: 'Customer', value: 'PT ABC Corporation' },
      { label: 'Invoice No', value: 'INV-2026-0423' },
      { label: 'Due Date', value: '15 Mei 2026' },
      { label: 'Payment Terms', value: 'Net 30' },
    ],
  },
];

export default function BPMApprovalInboxPage() {
  const [selectedApproval, setSelectedApproval] = useState<Approval>(approvals[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredApprovals = approvals.filter((approval) => {
    const matchesType = filterType === 'all' || approval.type === filterType;
    const matchesPriority = filterPriority === 'all' || approval.priority === filterPriority;
    return matchesType && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>BPM (Workflow)</span>
        <span>/</span>
        <span className="text-foreground">Workflow Approval</span>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl mb-1">Approval Inbox</h1>
        <p className="text-sm text-muted-foreground">Kelola approval pending Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approval List */}
        <Card className="lg:col-span-1">
          {/* Filters */}
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari approval..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              >
                <option value="all">Semua Tipe</option>
                <option value="Cuti">Cuti</option>
                <option value="Expense">Expense</option>
                <option value="Purchase Order">Purchase Order</option>
                <option value="Timesheet">Timesheet</option>
                <option value="Invoice">Invoice</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              >
                <option value="all">Semua Prioritas</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Approval Items */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredApprovals.map((approval) => (
              <div
                key={approval.id}
                onClick={() => setSelectedApproval(approval)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedApproval.id === approval.id
                    ? 'border-[#7B2D8B] bg-[#7B2D8B]/5'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={getPriorityColor(approval.priority) as any}>
                    {approval.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{approval.requestDate}</span>
                </div>
                <h3 className="text-sm mb-1">{approval.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span>{approval.requester}</span>
                </div>
                {approval.amount && (
                  <div className="mt-2 text-sm text-[#7B2D8B]">{approval.amount}</div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Approval Detail */}
        <Card title="Detail Approval" className="lg:col-span-2">
          <div className="space-y-6">
            {/* Header */}
            <div className="pb-6 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={getPriorityColor(selectedApproval.priority) as any}>
                      {selectedApproval.type}
                    </Badge>
                    <Badge variant="warning">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Pending
                    </Badge>
                  </div>
                  <h2 className="text-xl mb-2">{selectedApproval.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedApproval.requester}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedApproval.requestDate}</span>
                  </div>
                </div>
                {selectedApproval.amount && (
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
                    <div className="text-2xl text-[#7B2D8B]">{selectedApproval.amount}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm mb-2">Deskripsi</h3>
              <p className="text-sm text-muted-foreground">{selectedApproval.description}</p>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-sm mb-3">Detail Informasi</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedApproval.details.map((detail, index) => (
                  <div key={index} className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">{detail.label}</div>
                    <div className="text-sm">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Timeline */}
            <div>
              <h3 className="text-sm mb-3">Workflow Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Request Submitted</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedApproval.requester} • {selectedApproval.requestDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Waiting for Manager Approval</div>
                    <div className="text-xs text-muted-foreground">Current step</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-40">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Process Completed</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-sm mb-3">Komentar</h3>
              <textarea
                placeholder="Tambahkan komentar..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B] resize-none"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-border">
              <Button variant="primary" className="flex-1 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Approve
              </Button>
              <Button variant="danger" className="flex-1 flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
              <Button variant="secondary">Forward</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

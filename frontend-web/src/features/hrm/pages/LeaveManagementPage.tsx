import { useState } from 'react';
import { Calendar, Plus, CheckCircle, Clock, XCircle } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
  color: string;
}

interface LeaveRequest {
  id: number;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
}

const leaveBalances: LeaveBalance[] = [
  { type: 'Cuti Tahunan', total: 12, used: 5, remaining: 7, color: 'bg-[#7B2D8B]' },
  { type: 'Cuti Sakit', total: 10, used: 2, remaining: 8, color: 'bg-[#E91E8C]' },
  { type: 'Cuti Khusus', total: 3, used: 0, remaining: 3, color: 'bg-[#9D4EDD]' },
];

const leaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employee: 'Budi Santoso',
    type: 'Cuti Tahunan',
    startDate: '2026-05-10',
    endDate: '2026-05-14',
    days: 5,
    status: 'pending',
    reason: 'Liburan keluarga',
  },
  {
    id: 2,
    employee: 'Siti Nurhaliza',
    type: 'Cuti Sakit',
    startDate: '2026-05-05',
    endDate: '2026-05-06',
    days: 2,
    status: 'approved',
    reason: 'Sakit flu',
  },
  {
    id: 3,
    employee: 'Ahmad Fauzi',
    type: 'Cuti Tahunan',
    startDate: '2026-04-15',
    endDate: '2026-04-19',
    days: 5,
    status: 'approved',
    reason: 'Mudik lebaran',
  },
  {
    id: 4,
    employee: 'Rina Wijaya',
    type: 'Cuti Khusus',
    startDate: '2026-04-20',
    endDate: '2026-04-20',
    days: 1,
    status: 'rejected',
    reason: 'Pernikahan saudara',
  },
];

const teamCalendar = [
  { date: '2026-05-05', employee: 'Siti Nurhaliza', type: 'Cuti Sakit' },
  { date: '2026-05-06', employee: 'Siti Nurhaliza', type: 'Cuti Sakit' },
  { date: '2026-05-10', employee: 'Budi Santoso', type: 'Cuti Tahunan (Pending)' },
  { date: '2026-05-11', employee: 'Budi Santoso', type: 'Cuti Tahunan (Pending)' },
  { date: '2026-05-12', employee: 'Budi Santoso', type: 'Cuti Tahunan (Pending)' },
  { date: '2026-05-13', employee: 'Budi Santoso', type: 'Cuti Tahunan (Pending)' },
  { date: '2026-05-14', employee: 'Budi Santoso', type: 'Cuti Tahunan (Pending)' },
];

export default function LeaveManagementPage() {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Leave Management (Cuti)</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Leave Management</h1>
          <p className="text-sm text-muted-foreground">Kelola cuti karyawan Anda</p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => setShowRequestForm(!showRequestForm)}
        >
          <Plus className="w-4 h-4" />
          Ajukan Cuti
        </Button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaveBalances.map((balance) => (
          <Card key={balance.type}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-sm text-muted-foreground mb-2">{balance.type}</h3>
                <p className="text-3xl mb-1">{balance.remaining}</p>
                <p className="text-xs text-muted-foreground">dari {balance.total} hari</p>
              </div>
              <div className={`${balance.color} rounded-lg p-3`}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Terpakai</span>
                <span className="text-xs">
                  {balance.used} / {balance.total} hari
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${balance.color} h-2 rounded-full transition-all`}
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Leave Request Form */}
      {showRequestForm && (
        <Card title="Form Pengajuan Cuti">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Jenis Cuti</label>
              <select className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]">
                <option>Cuti Tahunan</option>
                <option>Cuti Sakit</option>
                <option>Cuti Khusus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Durasi</label>
              <select className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]">
                <option>Full Day</option>
                <option>Half Day</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Tanggal Mulai</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Tanggal Selesai</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Alasan</label>
              <textarea
                rows={3}
                placeholder="Jelaskan alasan pengajuan cuti..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B] resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Upload Dokumen Pendukung (Opsional)</label>
              <input
                type="file"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Button variant="primary">Submit Pengajuan</Button>
            <Button variant="secondary" onClick={() => setShowRequestForm(false)}>
              Batal
            </Button>
          </div>
        </Card>
      )}

      {/* Leave Requests & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Requests History */}
        <Card title="Riwayat Pengajuan" className="lg:col-span-2">
          <div className="space-y-3">
            {leaveRequests.map((request) => (
              <div
                key={request.id}
                className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">
                        {request.employee.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm">{request.employee}</div>
                        <div className="text-xs text-muted-foreground">{request.type}</div>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(request.status) as any}>
                    {request.status === 'approved' ? 'Disetujui' : request.status === 'pending' ? 'Pending' : 'Ditolak'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Tanggal</div>
                    <div>
                      {request.startDate} - {request.endDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Durasi</div>
                    <div>{request.days} hari</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-1">Alasan</div>
                  <div className="text-sm">{request.reason}</div>
                </div>

                {/* Approval Timeline */}
                {request.status === 'approved' && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-3">Status Approval</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs">Manager</span>
                      </div>
                      <div className="flex-1 h-px bg-green-600" />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs">HR</span>
                      </div>
                      <div className="flex-1 h-px bg-green-600" />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs">Approved</span>
                      </div>
                    </div>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-3">Status Approval</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs">Submitted</span>
                      </div>
                      <div className="flex-1 h-px bg-gray-300" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-xs">Manager</span>
                      </div>
                      <div className="flex-1 h-px bg-gray-300" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-300" />
                        <span className="text-xs">HR</span>
                      </div>
                    </div>
                  </div>
                )}

                {request.status === 'rejected' && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-3">Status Approval</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs">Submitted</span>
                      </div>
                      <div className="flex-1 h-px bg-red-600" />
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-xs">Rejected</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Team Calendar */}
        <Card title="Kalender Tim">
          <div className="space-y-3">
            {teamCalendar.map((item, index) => (
              <div
                key={index}
                className="p-3 border-l-4 border-[#7B2D8B] bg-secondary rounded"
              >
                <div className="text-xs text-muted-foreground mb-1">{item.date}</div>
                <div className="text-sm mb-1">{item.employee}</div>
                <div className="text-xs text-muted-foreground">{item.type}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

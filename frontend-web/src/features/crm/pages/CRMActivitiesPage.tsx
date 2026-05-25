import { useState } from 'react';
import { Phone, Mail, Calendar, MessageSquare, FileText, Plus, Filter } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Activity {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description: string;
  customer: string;
  assignedTo: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'scheduled';
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'call',
    title: 'Follow-up Call PT ABC Corp',
    description: 'Diskusi terkait proposal yang telah dikirim',
    customer: 'PT ABC Corporation',
    assignedTo: 'Budi Santoso',
    date: '2026-05-05',
    time: '14:00',
    status: 'completed',
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Presentasi Produk',
    description: 'Presentasi fitur baru ERP kepada PT Teknologi Nusantara',
    customer: 'PT Teknologi Nusantara',
    assignedTo: 'Maya Anggraini',
    date: '2026-05-06',
    time: '10:00',
    status: 'scheduled',
  },
  {
    id: 3,
    type: 'email',
    title: 'Kirim Quotation',
    description: 'Mengirim penawaran harga untuk paket implementasi',
    customer: 'CV Mandiri Jaya',
    assignedTo: 'Budi Santoso',
    date: '2026-05-04',
    time: '09:30',
    status: 'completed',
  },
  {
    id: 4,
    type: 'task',
    title: 'Persiapan Demo',
    description: 'Menyiapkan environment demo untuk client baru',
    customer: 'PT Indo Berkah',
    assignedTo: 'Ahmad Fauzi',
    date: '2026-05-07',
    time: '13:00',
    status: 'pending',
  },
  {
    id: 5,
    type: 'note',
    title: 'Meeting Minutes',
    description: 'Catatan hasil diskusi dengan PT ABC Corporation',
    customer: 'PT ABC Corporation',
    assignedTo: 'Budi Santoso',
    date: '2026-05-03',
    time: '16:00',
    status: 'completed',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'call':
      return Phone;
    case 'email':
      return Mail;
    case 'meeting':
      return Calendar;
    case 'note':
      return MessageSquare;
    case 'task':
      return FileText;
    default:
      return FileText;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'call':
      return 'bg-blue-500';
    case 'email':
      return 'bg-green-500';
    case 'meeting':
      return 'bg-[#7B2D8B]';
    case 'note':
      return 'bg-amber-500';
    case 'task':
      return 'bg-[#E91E8C]';
    default:
      return 'bg-gray-500';
  }
};

export default function CRMActivitiesPage() {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredActivities = activities.filter((activity) => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    return matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>CRM</span>
        <span>/</span>
        <span className="text-foreground">Aktivitas</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Aktivitas CRM</h1>
          <p className="text-sm text-muted-foreground">Kelola semua aktivitas sales dan customer</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Aktivitas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Total</div>
          <div className="text-2xl">{activities.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Completed</div>
          <div className="text-2xl text-green-600">
            {activities.filter((a) => a.status === 'completed').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Pending</div>
          <div className="text-2xl text-amber-500">
            {activities.filter((a) => a.status === 'pending').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Scheduled</div>
          <div className="text-2xl text-[#7B2D8B]">
            {activities.filter((a) => a.status === 'scheduled').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Today</div>
          <div className="text-2xl">{activities.filter((a) => a.date === '2026-05-05').length}</div>
        </Card>
      </div>

      <Card>
        <div className="mb-6 flex gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
          >
            <option value="all">Semua Tipe</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="meeting">Meeting</option>
            <option value="note">Note</option>
            <option value="task">Task</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
          >
            <option value="all">Semua Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div className="space-y-3">
          {filteredActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`${getActivityColor(activity.type)} rounded-lg p-3 flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      </div>
                      <Badge
                        variant={
                          activity.status === 'completed'
                            ? 'success'
                            : activity.status === 'pending'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground">
                      <div>
                        <span className="text-xs">Customer:</span>
                        <div>{activity.customer}</div>
                      </div>
                      <div>
                        <span className="text-xs">Assigned to:</span>
                        <div>{activity.assignedTo}</div>
                      </div>
                      <div>
                        <span className="text-xs">Date:</span>
                        <div>{activity.date}</div>
                      </div>
                      <div>
                        <span className="text-xs">Time:</span>
                        <div>{activity.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

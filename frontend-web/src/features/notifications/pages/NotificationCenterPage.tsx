import { useState } from 'react';
import { Bell, CheckCircle, Mail, AlertCircle, Workflow, Settings, Check } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Notification {
  id: number;
  type: 'bpm' | 'email' | 'system' | 'approval';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: any;
  iconColor: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'approval',
    title: 'Pengajuan Cuti Baru',
    description: 'Budi Santoso mengajukan cuti tahunan untuk 5 hari (10-14 Mei 2026)',
    time: '5 menit lalu',
    read: false,
    icon: CheckCircle,
    iconColor: 'bg-amber-500',
  },
  {
    id: 2,
    type: 'bpm',
    title: 'BPM Workflow Completed',
    description: 'Workflow "Purchase Order Laptop Dell" telah selesai diproses',
    time: '15 menit lalu',
    read: false,
    icon: Workflow,
    iconColor: 'bg-green-500',
  },
  {
    id: 3,
    type: 'email',
    title: 'New Email from Client',
    description: 'PT ABC Corporation mengirim email terkait invoice #INV-2026-0423',
    time: '1 jam lalu',
    read: false,
    icon: Mail,
    iconColor: 'bg-blue-500',
  },
  {
    id: 4,
    type: 'system',
    title: 'System Maintenance Scheduled',
    description: 'Sistem akan maintenance pada Minggu, 7 Mei 2026 pukul 02:00 - 06:00',
    time: '2 jam lalu',
    read: true,
    icon: AlertCircle,
    iconColor: 'bg-red-500',
  },
  {
    id: 5,
    type: 'approval',
    title: 'Expense Report Approved',
    description: 'Expense report Anda sebesar Rp 3.450.000 telah disetujui',
    time: '3 jam lalu',
    read: true,
    icon: CheckCircle,
    iconColor: 'bg-green-500',
  },
  {
    id: 6,
    type: 'bpm',
    title: 'Workflow Approval Required',
    description: 'Anda memiliki 3 approval pending di BPM workflow',
    time: '5 jam lalu',
    read: true,
    icon: Workflow,
    iconColor: 'bg-[#7B2D8B]',
  },
  {
    id: 7,
    type: 'email',
    title: 'Email Reminder',
    description: 'Follow up dengan PT Teknologi Nusantara terkait proposal',
    time: '1 hari lalu',
    read: true,
    icon: Mail,
    iconColor: 'bg-blue-500',
  },
  {
    id: 8,
    type: 'system',
    title: 'New Feature Available',
    description: 'Fitur baru "Gantt Chart" telah tersedia di Project Management',
    time: '2 hari lalu',
    read: true,
    icon: Settings,
    iconColor: 'bg-[#E91E8C]',
  },
  {
    id: 9,
    type: 'approval',
    title: 'Timesheet Approved',
    description: 'Timesheet minggu 22-26 April 2026 telah disetujui oleh manager',
    time: '2 hari lalu',
    read: true,
    icon: CheckCircle,
    iconColor: 'bg-green-500',
  },
  {
    id: 10,
    type: 'bpm',
    title: 'BPM Workflow Started',
    description: 'Workflow "Customer Invoice Approval" telah dimulai',
    time: '3 hari lalu',
    read: true,
    icon: Workflow,
    iconColor: 'bg-[#7B2D8B]',
  },
];

export default function NotificationCenterPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'bpm' | 'email' | 'system'>('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const filteredNotifications =
    activeTab === 'all'
      ? notificationList
      : notificationList.filter((n) => n.type === activeTab);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const tabs = [
    { id: 'all', label: 'Semua', count: notificationList.length },
    { id: 'bpm', label: 'BPM Approval', count: notificationList.filter((n) => n.type === 'bpm').length },
    { id: 'email', label: 'Email', count: notificationList.filter((n) => n.type === 'email').length },
    { id: 'system', label: 'System', count: notificationList.filter((n) => n.type === 'system').length },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-foreground">Notification Center</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Notifikasi</h1>
          <p className="text-sm text-muted-foreground">
            Anda memiliki {unreadCount} notifikasi yang belum dibaca
          </p>
        </div>
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Check className="w-4 h-4" />
          Tandai Semua Telah Dibaca
        </Button>
      </div>

      <Card>
        {/* Tabs */}
        <div className="mb-6 border-b border-border">
          <div className="flex items-center gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#7B2D8B] text-[#7B2D8B]'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-sm">{tab.label}</span>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-[#7B2D8B] text-white'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto text-muted-foreground opacity-20 mb-4" />
              <p className="text-sm text-muted-foreground">Tidak ada notifikasi</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                  notification.read
                    ? 'border-border hover:bg-secondary'
                    : 'border-[#7B2D8B] bg-[#7B2D8B]/5 hover:bg-[#7B2D8B]/10'
                }`}
              >
                {/* Icon */}
                <div className={`${notification.iconColor} rounded-lg p-3 flex-shrink-0`}>
                  <notification.icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-sm">{notification.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#7B2D8B] rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>

                  {/* Action buttons for unread notifications */}
                  {!notification.read && notification.type === 'approval' && (
                    <div className="flex items-center gap-2 mt-3">
                      <button className="px-3 py-1.5 bg-[#7B2D8B] text-white rounded text-xs hover:bg-[#6B1D7B] transition-colors">
                        Lihat Detail
                      </button>
                      <button className="px-3 py-1.5 border border-border rounded text-xs hover:bg-secondary transition-colors">
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="ghost" size="sm">
              Load More
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

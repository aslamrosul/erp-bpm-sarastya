import { useState, useEffect } from 'react';
import { Users, DollarSign, Briefcase, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import KPICard from '../components/KPICard';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardService, DashboardData } from '../services/dashboard.service';

const revenueData = [
  { month: 'Nov', revenue: 45000000, target: 50000000 },
  { month: 'Des', revenue: 52000000, target: 55000000 },
  { month: 'Jan', revenue: 48000000, target: 50000000 },
  { month: 'Feb', revenue: 61000000, target: 60000000 },
  { month: 'Mar', revenue: 55000000, target: 58000000 },
  { month: 'Apr', revenue: 67000000, target: 65000000 },
];

const projectStatusData = [
  { name: 'Selesai', value: 12, color: '#22c55e' },
  { name: 'Berjalan', value: 8, color: '#7B2D8B' },
  { name: 'Tertunda', value: 3, color: '#f59e0b' },
  { name: 'Dibatalkan', value: 2, color: '#ef4444' },
];

const approvalData = [
  { id: 1, type: 'Cuti', requester: 'Budi Santoso', date: '2026-05-03', status: 'pending' },
  { id: 2, type: 'Expense', requester: 'Siti Nurhaliza', date: '2026-05-02', status: 'pending' },
  { id: 3, type: 'Purchase Order', requester: 'Ahmad Fauzi', date: '2026-05-01', status: 'pending' },
];

const activityData = [
  { id: 1, user: 'Rina Wijaya', action: 'Membuat Sales Order #SO-2026-0512', time: '10 menit lalu' },
  { id: 2, user: 'Dedi Kurniawan', action: 'Approve Cuti untuk Budi Santoso', time: '25 menit lalu' },
  { id: 3, user: 'Maya Anggraini', action: 'Update Customer Invoice #INV-2026-0423', time: '1 jam lalu' },
  { id: 4, user: 'Farhan Pratama', action: 'Upload dokumen kontrak pelanggan', time: '2 jam lalu' },
  { id: 5, user: 'Lisa Permata', action: 'Membuat Purchase Request #PR-2026-0156', time: '3 jam lalu' },
];

const upcomingEvents = [
  { id: 1, title: 'Meeting Client XYZ Corp', date: '05 Mei 2026', time: '14:00' },
  { id: 2, title: 'Review Budget Q2', date: '06 Mei 2026', time: '10:00' },
  { id: 3, title: 'Training BPM Workflow', date: '07 Mei 2026', time: '09:00' },
];

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getDashboard();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B2D8B] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Dashboard</span>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Selamat datang kembali, Admin User</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Total Users"
          value={dashboardData?.totalUsers.toString() || '0'}
          icon={Users}
          iconBgColor="bg-[#7B2D8B]"
        />
        <KPICard
          title="Total Projects"
          value={dashboardData?.totalProjects.toString() || '0'}
          icon={Briefcase}
          iconBgColor="bg-[#E91E8C]"
        />
        <KPICard
          title="Active Projects"
          value={dashboardData?.activeProjects.toString() || '0'}
          icon={TrendingUp}
          iconBgColor="bg-[#9D4EDD]"
        />
        <KPICard
          title="Total Tasks"
          value={dashboardData?.totalTasks.toString() || '0'}
          icon={CheckCircle}
          iconBgColor="bg-[#F72585]"
        />
        <KPICard
          title="Completed Tasks"
          value={dashboardData?.completedTasks.toString() || '0'}
          icon={CheckCircle}
          iconBgColor="bg-[#B5179E]"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card title="Revenue vs Target (6 Bulan)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#7B2D8B" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#E91E8C" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Project Status Chart */}
        <Card title="Project Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData?.projectStatus.map((item, index) => ({
                  ...item,
                  color: ['#22c55e', '#7B2D8B', '#f59e0b', '#ef4444'][index % 4]
                })) || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {(dashboardData?.projectStatus || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#22c55e', '#7B2D8B', '#f59e0b', '#ef4444'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Activity & Approvals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BPM Approval Pending */}
        <Card title="Approval Pending" action={<a href="/bpm/approval" className="text-sm text-[#7B2D8B] hover:text-[#E91E8C]">Lihat semua</a>}>
          <div className="space-y-3">
            {approvalData.map((item) => (
              <div key={item.id} className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <Badge variant="info" className="mb-2">{item.type}</Badge>
                    <p className="text-sm">{item.requester}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activities">
          <div className="space-y-3">
            {dashboardData?.recentActivities && dashboardData.recentActivities.length > 0 ? (
              dashboardData.recentActivities.map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs flex-shrink-0">
                    {item.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.user}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activities</p>
            )}
          </div>
        </Card>

        {/* Calendar Events */}
        <Card title="Event Minggu Ini" action={<Calendar className="w-5 h-5 text-[#7B2D8B]" />}>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 border-l-4 border-[#7B2D8B] bg-secondary rounded">
                <p className="text-sm mb-1">{event.title}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

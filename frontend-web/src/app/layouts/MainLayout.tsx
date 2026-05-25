import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/auth.store';
import {
  Home, Users, Calendar, FileText, TrendingUp, ShoppingCart,
  FileBarChart, Calculator, DollarSign, Briefcase, UserCog,
  Clipboard, UserCheck, Plane, Receipt, Clock, UserPlus,
  FileCheck, Workflow, Settings, Shield, Mail, Menu, X,
  Search, Bell, ChevronDown, ChevronRight, LogOut
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: any;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: Home, path: '/' },
  {
    label: 'Teamwork',
    icon: Users,
    children: [
      { label: 'Calendar', icon: Calendar, path: '/teamwork/calendar' },
      { label: 'Documents', icon: FileText, path: '/teamwork/documents' },
    ],
  },
  {
    label: 'CRM',
    icon: TrendingUp,
    children: [
      { label: 'Leads & Peluang', icon: TrendingUp, path: '/crm/leads' },
      { label: 'Pipeline Sales', icon: TrendingUp, path: '/crm/pipeline' },
      { label: 'Pelanggan', icon: Users, path: '/crm/customers' },
      { label: 'Aktivitas', icon: Clipboard, path: '/crm/activities' },
    ],
  },
  {
    label: 'Sales (Penjualan)',
    icon: ShoppingCart,
    children: [
      { label: 'Quotation / Penawaran', icon: FileText, path: '/sales/quotation' },
      { label: 'Sales Order', icon: ShoppingCart, path: '/sales/order' },
      { label: 'Laporan Penjualan', icon: FileBarChart, path: '/sales/report' },
    ],
  },
  {
    label: 'Purchases (Pembelian)',
    icon: ShoppingCart,
    children: [
      { label: 'Purchase Request', icon: FileText, path: '/purchases/request' },
      { label: 'Purchase Order', icon: ShoppingCart, path: '/purchases/order' },
      { label: 'Supplier', icon: Users, path: '/purchases/supplier' },
    ],
  },
  {
    label: 'Invoicing (Faktur)',
    icon: Receipt,
    children: [
      { label: 'Customer Invoice', icon: Receipt, path: '/invoicing/customer' },
      { label: 'Supplier Invoice', icon: Receipt, path: '/invoicing/supplier' },
      { label: 'Pembayaran', icon: DollarSign, path: '/invoicing/payment' },
    ],
  },
  {
    label: 'Accounting (Akuntansi)',
    icon: Calculator,
    children: [
      { label: 'Journal Entries', icon: FileText, path: '/accounting/journal' },
      { label: 'Chart of Accounts', icon: Calculator, path: '/accounting/chart' },
      { label: 'Laporan Keuangan', icon: FileBarChart, path: '/accounting/report' },
      { label: 'Budget', icon: DollarSign, path: '/accounting/budget' },
    ],
  },
  {
    label: 'Budget Management',
    icon: DollarSign,
    children: [
      { label: 'Budget Lines', icon: FileText, path: '/budget/lines' },
      { label: 'Laporan Budget', icon: FileBarChart, path: '/budget/report' },
    ],
  },
  {
    label: 'Project Management',
    icon: Briefcase,
    path: '/projects',
  },
  {
    label: 'HR (SDM)',
    icon: UserCog,
    children: [
      { label: 'Karyawan', icon: Users, path: '/hrm/employees' },
      { label: 'Departemen', icon: Briefcase, path: '/hrm/departments' },
      { label: 'Jabatan', icon: UserCheck, path: '/hrm/positions' },
    ],
  },
  {
    label: 'MyHR (Self Service)',
    icon: UserCheck,
    children: [
      { label: 'Profil Saya', icon: UserCheck, path: '/myhr/profile' },
      { label: 'Cuti Saya', icon: Plane, path: '/myhr/leave' },
      { label: 'Timesheet Saya', icon: Clock, path: '/myhr/timesheet' },
      { label: 'Expense Saya', icon: Receipt, path: '/myhr/expense' },
    ],
  },
  {
    label: 'Leave Management (Cuti)',
    icon: Plane,
    path: '/leave',
  },
  {
    label: 'Expense Management',
    icon: Receipt,
    children: [
      { label: 'Expense Report', icon: Receipt, path: '/expense/report' },
      { label: 'Approval Expense', icon: FileCheck, path: '/expense/approval' },
    ],
  },
  {
    label: 'Timesheet Management',
    icon: Clock,
    children: [
      { label: 'Input Timesheet', icon: Clock, path: '/timesheet/input' },
      { label: 'Validasi Timesheet', icon: FileCheck, path: '/timesheet/validate' },
    ],
  },
  {
    label: 'Recruitment',
    icon: UserPlus,
    children: [
      { label: 'Job Positions', icon: Briefcase, path: '/recruitment/positions' },
      { label: 'Kandidat', icon: Users, path: '/recruitment/candidates' },
      { label: 'Tahapan Rekrutmen', icon: Workflow, path: '/recruitment/stages' },
    ],
  },
  {
    label: 'Contracts (Kontrak)',
    icon: FileCheck,
    children: [
      { label: 'Kontrak Karyawan', icon: FileCheck, path: '/contracts/employee' },
      { label: 'Kontrak Pelanggan', icon: FileCheck, path: '/contracts/customer' },
    ],
  },
  {
    label: 'BPM (Workflow)',
    icon: Workflow,
    children: [
      { label: 'Proses Aktif', icon: Workflow, path: '/bpm/active' },
      { label: 'BPM Studio', icon: Settings, path: '/bpm/studio' },
      { label: 'Workflow Approval', icon: FileCheck, path: '/bpm/approval' },
      { label: 'History Proses', icon: FileText, path: '/bpm/history' },
    ],
  },
  {
    label: 'Application Config',
    icon: Settings,
    children: [
      { label: 'Apps Management', icon: Settings, path: '/config/apps' },
      { label: 'General Data', icon: FileText, path: '/config/general' },
      { label: 'Users & Companies', icon: Users, path: '/users' },
      { label: 'Configuration', icon: Settings, path: '/config/settings' },
    ],
  },
  {
    label: 'Administration',
    icon: Shield,
    children: [
      { label: 'Technical', icon: Settings, path: '/admin/technical' },
      { label: 'Batches', icon: Clipboard, path: '/admin/batches' },
      { label: 'Message', icon: Mail, path: '/admin/message' },
      { label: 'Security', icon: Shield, path: '/admin/security' },
    ],
  },
];

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Dashboard']);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-[#f5f5f7]">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? 'w-16' : 'w-60'
        } bg-white border-r border-border transition-all duration-300 flex flex-col relative z-50`}
      >
        {/* Sidebar Header */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-sm">
                S
              </div>
              <span className="text-sm text-foreground">PT Sarastya</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-secondary rounded-md transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors ${
                      isCollapsed ? 'justify-center' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {expandedMenus.includes(item.label) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>
                  {expandedMenus.includes(item.label) && !isCollapsed && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path || '#'}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors ${
                            isActive(child.path) ? 'bg-[#7B2D8B] text-white hover:bg-[#7B2D8B]' : ''
                          }`}
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path || '#'}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors ${
                    isCollapsed ? 'justify-center' : ''
                  } ${isActive(item.path) ? 'bg-[#7B2D8B] text-white hover:bg-[#7B2D8B]' : ''}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari..."
                className="w-full pl-10 pr-4 py-2 bg-[#f5f5f7] rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/notifications" className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E91E8C] rounded-full"></span>
            </Link>
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E91E8C] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="text-sm">
                <div>{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

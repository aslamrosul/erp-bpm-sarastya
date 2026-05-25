import { useState } from 'react';
import { Search, Plus, Phone, Mail, Building, TrendingUp, Star } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Lead {
  id: number;
  company: string;
  contact: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  value: number;
  assignedTo: string;
  createdDate: string;
  rating: number;
}

const leads: Lead[] = [
  {
    id: 1,
    company: 'PT Sejahtera Makmur',
    contact: 'Andi Wijaya',
    email: 'andi@sejahtera.co.id',
    phone: '+62 812-3456-7890',
    source: 'Website',
    status: 'new',
    value: 150000000,
    assignedTo: 'Budi Santoso',
    createdDate: '2026-05-05',
    rating: 4,
  },
  {
    id: 2,
    company: 'CV Digital Prima',
    contact: 'Sarah Permata',
    email: 'sarah@digitaprima.com',
    phone: '+62 813-4567-8901',
    source: 'Referral',
    status: 'contacted',
    value: 85000000,
    assignedTo: 'Maya Anggraini',
    createdDate: '2026-05-03',
    rating: 5,
  },
  {
    id: 3,
    company: 'PT Inovasi Teknologi',
    contact: 'Rudi Hartono',
    email: 'rudi@inovasitek.id',
    phone: '+62 814-5678-9012',
    source: 'Cold Call',
    status: 'qualified',
    value: 320000000,
    assignedTo: 'Budi Santoso',
    createdDate: '2026-04-28',
    rating: 5,
  },
  {
    id: 4,
    company: 'CV Mandiri Jaya',
    contact: 'Lisa Anggraini',
    email: 'lisa@mandirijaya.co.id',
    phone: '+62 815-6789-0123',
    source: 'LinkedIn',
    status: 'contacted',
    value: 120000000,
    assignedTo: 'Maya Anggraini',
    createdDate: '2026-04-25',
    rating: 3,
  },
  {
    id: 5,
    company: 'PT Sukses Bersama',
    contact: 'Dimas Prasetyo',
    email: 'dimas@suksesbersama.com',
    phone: '+62 816-7890-1234',
    source: 'Exhibition',
    status: 'unqualified',
    value: 45000000,
    assignedTo: 'Budi Santoso',
    createdDate: '2026-04-20',
    rating: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'info';
    case 'contacted':
      return 'warning';
    case 'qualified':
      return 'success';
    case 'unqualified':
      return 'danger';
    default:
      return 'default';
  }
};

export default function CRMLeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>CRM</span>
        <span>/</span>
        <span className="text-foreground">Leads & Peluang</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Leads & Peluang</h1>
          <p className="text-sm text-muted-foreground">{leads.length} leads aktif</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Lead
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-muted-foreground mb-1">New Leads</div>
          <div className="text-2xl">{leads.filter((l) => l.status === 'new').length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Contacted</div>
          <div className="text-2xl">{leads.filter((l) => l.status === 'contacted').length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Qualified</div>
          <div className="text-2xl text-green-600">
            {leads.filter((l) => l.status === 'qualified').length}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Total Value</div>
          <div className="text-2xl text-[#7B2D8B]">
            Rp {(leads.reduce((sum, l) => sum + l.value, 0) / 1000000).toFixed(0)}M
          </div>
        </Card>
      </div>

      <Card>
        {/* Filters */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari perusahaan atau kontak..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
          >
            <option value="all">Semua Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="unqualified">Unqualified</option>
          </select>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm">Perusahaan</th>
                <th className="text-left py-3 px-4 text-sm">Kontak</th>
                <th className="text-left py-3 px-4 text-sm">Source</th>
                <th className="text-left py-3 px-4 text-sm">Value</th>
                <th className="text-left py-3 px-4 text-sm">Status</th>
                <th className="text-left py-3 px-4 text-sm">Rating</th>
                <th className="text-left py-3 px-4 text-sm">Assigned To</th>
                <th className="text-left py-3 px-4 text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-border hover:bg-secondary transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm">{lead.company}</div>
                        <div className="text-xs text-muted-foreground">{lead.createdDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm mb-1">{lead.contact}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{lead.source}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-[#7B2D8B]">
                      Rp {(lead.value / 1000000).toFixed(0)}M
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(lead.status) as any}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < lead.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">
                        {lead.assignedTo.charAt(0)}
                      </div>
                      <span className="text-sm">{lead.assignedTo}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="secondary" size="sm">
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

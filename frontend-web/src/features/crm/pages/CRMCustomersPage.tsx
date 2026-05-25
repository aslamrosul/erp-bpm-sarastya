import { useState } from 'react';
import { Search, Plus, Building, Phone, Mail, MapPin, DollarSign } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Customer {
  id: number;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  type: 'corporate' | 'individual';
  status: 'active' | 'inactive';
  totalRevenue: number;
  lastTransaction: string;
}

const customers: Customer[] = [
  {
    id: 1,
    company: 'PT ABC Corporation',
    contactPerson: 'John Doe',
    email: 'john@abc.co.id',
    phone: '+62 21-1234-5678',
    address: 'Jakarta Selatan',
    type: 'corporate',
    status: 'active',
    totalRevenue: 580000000,
    lastTransaction: '2026-05-01',
  },
  {
    id: 2,
    company: 'PT Teknologi Nusantara',
    contactPerson: 'Rudi Hartono',
    email: 'rudi@teknologi.id',
    phone: '+62 21-8765-4321',
    address: 'Jakarta Pusat',
    type: 'corporate',
    status: 'active',
    totalRevenue: 250000000,
    lastTransaction: '2026-04-28',
  },
  {
    id: 3,
    company: 'CV Mandiri Jaya',
    contactPerson: 'Lisa Anggraini',
    email: 'lisa@mandiri.com',
    phone: '+62 812-3456-7890',
    address: 'Bandung',
    type: 'corporate',
    status: 'active',
    totalRevenue: 125000000,
    lastTransaction: '2026-04-15',
  },
  {
    id: 4,
    company: 'Budi Santoso (Individual)',
    contactPerson: 'Budi Santoso',
    email: 'budi@gmail.com',
    phone: '+62 813-9876-5432',
    address: 'Surabaya',
    type: 'individual',
    status: 'active',
    totalRevenue: 45000000,
    lastTransaction: '2026-03-20',
  },
];

export default function CRMCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || customer.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>CRM</span>
        <span>/</span>
        <span className="text-foreground">Pelanggan</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Data Pelanggan</h1>
          <p className="text-sm text-muted-foreground">{customers.length} pelanggan terdaftar</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Pelanggan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Total Pelanggan</div>
          <div className="text-2xl">{customers.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
          <div className="text-2xl text-[#7B2D8B]">
            Rp {(customers.reduce((sum, c) => sum + c.totalRevenue, 0) / 1000000).toFixed(0)}M
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Active Customers</div>
          <div className="text-2xl text-green-600">
            {customers.filter((c) => c.status === 'active').length}
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
          >
            <option value="all">Semua Tipe</option>
            <option value="corporate">Corporate</option>
            <option value="individual">Individual</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white flex-shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-1">{customer.company}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={customer.type === 'corporate' ? 'info' : 'warning'}>
                        {customer.type}
                      </Badge>
                      <Badge variant={customer.status === 'active' ? 'success' : 'danger'}>
                        {customer.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{customer.address}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Total Revenue</div>
                  <div className="text-sm text-[#7B2D8B]">
                    Rp {(customer.totalRevenue / 1000000).toFixed(0)}M
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  Detail
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

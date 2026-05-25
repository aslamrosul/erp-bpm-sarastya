import { useState } from 'react';
import { Search, Plus, Building } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  status: 'active' | 'inactive';
  totalTransactions: number;
}

const suppliers: Supplier[] = [
  { id: 1, name: 'PT Teknologi Maju', contactPerson: 'Agus Wijaya', email: 'agus@teknomaju.id', phone: '+62 21-5555-6666', category: 'IT Equipment', status: 'active', totalTransactions: 25 },
  { id: 2, name: 'CV Supplies Indonesia', contactPerson: 'Diana Sari', email: 'diana@supplies.co.id', phone: '+62 21-7777-8888', category: 'Office Supplies', status: 'active', totalTransactions: 48 },
  { id: 3, name: 'PT Furnitur Berkah', contactPerson: 'Bambang', email: 'bambang@furnitur.com', phone: '+62 812-3456-7890', category: 'Furniture', status: 'active', totalTransactions: 12 },
];

export default function SupplierPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Purchases (Pembelian)</span>
        <span>/</span>
        <span className="text-foreground">Supplier</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Data Supplier</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Supplier
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white">
                  <Building className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">{supplier.name}</h3>
                  <Badge variant={supplier.status === 'active' ? 'success' : 'danger'}>{supplier.status}</Badge>
                </div>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mb-3">
                <div>Contact: {supplier.contactPerson}</div>
                <div>Email: {supplier.email}</div>
                <div>Phone: {supplier.phone}</div>
                <div>Category: {supplier.category}</div>
              </div>
              <div className="pt-3 border-t border-border text-sm text-muted-foreground">
                {supplier.totalTransactions} transactions
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

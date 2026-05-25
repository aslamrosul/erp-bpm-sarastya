import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';
import { Settings, ToggleLeft, ToggleRight } from 'lucide-react';

const apps = [
  { id: 1, name: 'CRM', description: 'Customer Relationship Management', status: 'active', version: 'v2.5.0' },
  { id: 2, name: 'Sales', description: 'Sales & Quotation Management', status: 'active', version: 'v3.1.2' },
  { id: 3, name: 'HR', description: 'Human Resources Management', status: 'active', version: 'v1.8.5' },
  { id: 4, name: 'Accounting', description: 'Financial Accounting System', status: 'active', version: 'v2.3.1' },
  { id: 5, name: 'BPM', description: 'Business Process Management', status: 'active', version: 'v1.5.0' },
  { id: 6, name: 'Recruitment', description: 'Recruitment Management', status: 'inactive', version: 'v1.0.2' },
];

export default function AppsManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Application Config</span>
        <span>/</span>
        <span className="text-foreground">Apps Management</span>
      </div>

      <h1 className="text-2xl">Apps Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-sm text-muted-foreground mb-1">Total Apps</div><div className="text-2xl">{apps.length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Active</div><div className="text-2xl text-green-600">{apps.filter(a => a.status === 'active').length}</div></Card>
        <Card><div className="text-sm text-muted-foreground mb-1">Inactive</div><div className="text-2xl text-gray-400">{apps.filter(a => a.status === 'inactive').length}</div></Card>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apps.map((app) => (
            <div key={app.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm mb-1">{app.name}</h3>
                    <p className="text-xs text-muted-foreground">{app.description}</p>
                  </div>
                </div>
                {app.status === 'active' ? (
                  <ToggleRight className="w-6 h-6 text-green-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Version {app.version}</span>
                <Badge variant={app.status === 'active' ? 'success' : 'default'}>{app.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

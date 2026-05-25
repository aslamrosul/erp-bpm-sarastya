import Card from '../../../shared/components/cards/Card';
import Button from '../../../shared/components/buttons/Button';
import { Settings, Save } from 'lucide-react';

export default function ConfigurationPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Application Config</span>
        <span>/</span>
        <span className="text-foreground">Configuration</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">System Configuration</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="General Settings">
          <div className="space-y-4">
            <div><label className="block text-sm mb-2">Company Name</label><input type="text" defaultValue="PT Sarastya Agility Innovations" className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" /></div>
            <div><label className="block text-sm mb-2">System Email</label><input type="email" defaultValue="system@sarastya.id" className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]" /></div>
            <div><label className="block text-sm mb-2">Timezone</label><select className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"><option>Asia/Jakarta (WIB)</option></select></div>
          </div>
        </Card>

        <Card title="Business Settings">
          <div className="space-y-4">
            <div><label className="block text-sm mb-2">Default Currency</label><select className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"><option>IDR - Indonesian Rupiah</option></select></div>
            <div><label className="block text-sm mb-2">Fiscal Year Start</label><select className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"><option>January</option></select></div>
            <div><label className="block text-sm mb-2">Language</label><select className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"><option>Bahasa Indonesia</option></select></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

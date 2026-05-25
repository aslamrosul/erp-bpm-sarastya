import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import { Server, Database, Cpu, HardDrive } from 'lucide-react';

export default function AdminTechnicalPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Administration</span>
        <span>/</span>
        <span className="text-foreground">Technical</span>
      </div>

      <h1 className="text-2xl">Technical Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="flex items-center gap-3"><Server className="w-8 h-8 text-[#7B2D8B]" /><div><div className="text-xs text-muted-foreground">Server Status</div><Badge variant="success">Online</Badge></div></div></Card>
        <Card><div className="flex items-center gap-3"><Database className="w-8 h-8 text-[#E91E8C]" /><div><div className="text-xs text-muted-foreground">Database</div><Badge variant="success">Connected</Badge></div></div></Card>
        <Card><div className="flex items-center gap-3"><Cpu className="w-8 h-8 text-[#9D4EDD]" /><div><div className="text-xs text-muted-foreground">CPU Usage</div><div className="text-sm">45%</div></div></div></Card>
        <Card><div className="flex items-center gap-3"><HardDrive className="w-8 h-8 text-[#F72585]" /><div><div className="text-xs text-muted-foreground">Disk Usage</div><div className="text-sm">62%</div></div></div></Card>
      </div>

      <Card title="System Information">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-border"><span className="text-muted-foreground">Version:</span><span>v3.2.1</span></div>
          <div className="flex items-center justify-between py-2 border-b border-border"><span className="text-muted-foreground">Database:</span><span>PostgreSQL 14.5</span></div>
          <div className="flex items-center justify-between py-2 border-b border-border"><span className="text-muted-foreground">Server:</span><span>Ubuntu 22.04 LTS</span></div>
          <div className="flex items-center justify-between py-2"><span className="text-muted-foreground">Last Backup:</span><span>2026-05-06 02:00 AM</span></div>
        </div>
      </Card>
    </div>
  );
}

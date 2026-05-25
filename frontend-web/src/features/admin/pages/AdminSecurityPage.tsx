import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';

export default function AdminSecurityPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Administration</span>
        <span>/</span>
        <span className="text-foreground">Security</span>
      </div>

      <h1 className="text-2xl">Security Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><div className="flex items-center gap-3"><Shield className="w-8 h-8 text-green-600" /><div><div className="text-xs text-muted-foreground">Security Status</div><Badge variant="success">Secure</Badge></div></div></Card>
        <Card><div className="flex items-center gap-3"><Lock className="w-8 h-8 text-[#7B2D8B]" /><div><div className="text-xs text-muted-foreground">SSL</div><Badge variant="success">Enabled</Badge></div></div></Card>
        <Card><div className="flex items-center gap-3"><Key className="w-8 h-8 text-[#E91E8C]" /><div><div className="text-xs text-muted-foreground">2FA</div><Badge variant="warning">Optional</Badge></div></div></Card>
        <Card><div className="flex items-center gap-3"><AlertTriangle className="w-8 h-8 text-amber-500" /><div><div className="text-xs text-muted-foreground">Failed Logins</div><div className="text-sm">3 today</div></div></div></Card>
      </div>

      <Card title="Security Settings">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div><div className="text-sm">Force HTTPS</div><div className="text-xs text-muted-foreground">Redirect all HTTP to HTTPS</div></div>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div><div className="text-sm">Session Timeout</div><div className="text-xs text-muted-foreground">Auto logout after inactivity</div></div>
            <span className="text-sm">30 minutes</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div><div className="text-sm">Password Policy</div><div className="text-xs text-muted-foreground">Minimum password requirements</div></div>
            <Badge variant="success">Strong</Badge>
          </div>
          <div className="flex items-center justify-between py-3">
            <div><div className="text-sm">IP Whitelist</div><div className="text-xs text-muted-foreground">Restrict access by IP</div></div>
            <Badge variant="warning">Disabled</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

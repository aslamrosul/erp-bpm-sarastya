import Card from '../../../shared/components/cards/Card';
import Button from '../../../shared/components/buttons/Button';
import { Plus, Mail, Send } from 'lucide-react';
import Badge from '../../../shared/components/badges/Badge';

const messages = [
  { id: 1, subject: 'System Maintenance Notice', recipients: 'All Users', date: '2026-05-01', status: 'sent' },
  { id: 2, subject: 'New Features Available', recipients: 'All Users', date: '2026-04-28', status: 'sent' },
];

export default function AdminMessagePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Administration</span>
        <span>/</span>
        <span className="text-foreground">Message</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">System Messages</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Message
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-left py-3 px-4 text-sm">Subject</th><th className="text-left py-3 px-4 text-sm">Recipients</th><th className="text-left py-3 px-4 text-sm">Date</th><th className="text-left py-3 px-4 text-sm">Status</th></tr></thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{msg.subject}</td>
                  <td className="py-3 px-4 text-sm">{msg.recipients}</td>
                  <td className="py-3 px-4 text-sm">{msg.date}</td>
                  <td className="py-3 px-4"><Badge variant="success">{msg.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

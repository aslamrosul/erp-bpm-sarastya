import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

export default function MyHRProfilePage() {
  const profile = {
    name: 'Admin User',
    nik: 'EMP001',
    email: 'admin@sarastya.id',
    phone: '+62 812-3456-7890',
    address: 'Jakarta Selatan',
    position: 'IT Administrator',
    department: 'IT',
    joinDate: '2023-06-15',
    employmentType: 'Permanent',
    status: 'active',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>MyHR (Self Service)</span>
        <span>/</span>
        <span className="text-foreground">Profil Saya</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Profil Saya</h1>
        <Button variant="secondary" className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-3xl mb-4">
              {profile.name.charAt(0)}
            </div>
            <h2 className="text-xl mb-2">{profile.name}</h2>
            <div className="text-sm text-muted-foreground mb-3">{profile.nik}</div>
            <Badge variant={profile.status === 'active' ? 'success' : 'danger'}>{profile.status}</Badge>
          </div>
        </Card>

        <Card className="lg:col-span-2" title="Informasi Personal">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{profile.email}</span></div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Phone</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{profile.phone}</span></div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Address</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{profile.address}</span></div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Join Date</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{profile.joinDate}</span></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Informasi Pekerjaan">
          <div className="space-y-3">
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Jabatan:</span><span className="text-sm">{profile.position}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Departemen:</span><span className="text-sm">{profile.department}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Tipe Employment:</span><Badge variant="success">{profile.employmentType}</Badge></div>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" size="sm">Ajukan Cuti</Button>
            <Button variant="secondary" size="sm">Input Timesheet</Button>
            <Button variant="secondary" size="sm">Submit Expense</Button>
            <Button variant="secondary" size="sm">View Payslip</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

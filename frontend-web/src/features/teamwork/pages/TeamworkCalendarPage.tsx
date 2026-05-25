import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'event' | 'task';
  attendees?: string[];
  location?: string;
}

const events: CalendarEvent[] = [
  {
    id: 1,
    title: 'Meeting Client XYZ Corp',
    date: '2026-05-05',
    time: '14:00 - 16:00',
    type: 'meeting',
    attendees: ['Budi Santoso', 'Maya Anggraini'],
    location: 'Meeting Room A',
  },
  {
    id: 2,
    title: 'Review Budget Q2',
    date: '2026-05-06',
    time: '10:00 - 11:30',
    type: 'meeting',
    attendees: ['Siti Nurhaliza', 'Ahmad Fauzi'],
    location: 'Meeting Room B',
  },
  {
    id: 3,
    title: 'Training BPM Workflow',
    date: '2026-05-07',
    time: '09:00 - 12:00',
    type: 'event',
    attendees: ['All Staff'],
    location: 'Training Room',
  },
  {
    id: 4,
    title: 'Deadline: Proposal PT Indo Berkah',
    date: '2026-05-12',
    time: '17:00',
    type: 'deadline',
  },
  {
    id: 5,
    title: 'Sprint Planning',
    date: '2026-05-08',
    time: '13:00 - 15:00',
    type: 'meeting',
    attendees: ['Development Team'],
    location: 'Online - Zoom',
  },
];

const daysInMonth = 31;
const firstDayOfMonth = 3; // Wednesday

export default function TeamworkCalendarPage() {
  const [currentMonth] = useState('Mei 2026');
  const [selectedDate, setSelectedDate] = useState<number | null>(5);

  const getDayEvents = (day: number) => {
    const dateStr = `2026-05-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.date === dateStr);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-[#7B2D8B]';
      case 'deadline':
        return 'bg-red-500';
      case 'event':
        return 'bg-[#E91E8C]';
      case 'task':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedEvents = selectedDate ? getDayEvents(selectedDate) : [];

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Teamwork</span>
        <span>/</span>
        <span className="text-foreground">Calendar</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Team Calendar</h1>
          <p className="text-sm text-muted-foreground">Kelola jadwal dan acara tim Anda</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">{currentMonth}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-secondary rounded-lg text-sm">Hari Ini</button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
              <div key={day} className="text-center text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getDayEvents(day);
              const isToday = day === 5;
              const isSelected = day === selectedDate;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square p-2 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-[#7B2D8B] bg-[#7B2D8B]/10'
                      : isToday
                      ? 'border-[#7B2D8B] bg-[#7B2D8B]/5'
                      : 'border-border hover:bg-secondary'
                  }`}
                >
                  <div className="text-sm mb-1">{day}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`${getEventColor(event.type)} h-1 rounded-full`}
                      />
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{dayEvents.length - 2}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Event Details */}
        <Card title={`Event - ${selectedDate} Mei 2026`}>
          <div className="space-y-3">
            {selectedEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Tidak ada event</p>
              </div>
            ) : (
              selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm flex-1">{event.title}</h3>
                    <Badge
                      variant={
                        event.type === 'meeting'
                          ? 'info'
                          : event.type === 'deadline'
                          ? 'danger'
                          : 'success'
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.attendees && (
                      <div className="pt-2 border-t border-border">
                        <div className="text-xs mb-1">Peserta:</div>
                        <div className="flex flex-wrap gap-1">
                          {event.attendees.map((attendee, idx) => (
                            <div key={idx} className="px-2 py-1 bg-secondary rounded text-xs">
                              {attendee}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

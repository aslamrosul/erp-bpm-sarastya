import Badge from '../../../shared/components/badges/Badge';

interface GanttRowProps {
  title: string;
  status: string;
  startOffset: number;
  duration: number;
  totalDays: number;
  assigneeName?: string;
}

export default function GanttRow({
  title,
  status,
  startOffset,
  duration,
  totalDays,
  assigneeName,
}: GanttRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'review':
        return 'bg-yellow-500';
      case 'todo':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'done':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'review':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'todo':
        return 'To Do';
      case 'review':
        return 'Review';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Task Info */}
      <div className="w-48 flex-shrink-0">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-muted-foreground">
          {assigneeName || 'Unassigned'}
        </div>
      </div>

      {/* Timeline Bar */}
      <div className="flex-1 relative h-10 bg-gray-100 rounded">
        <div
          className={`absolute h-full ${getStatusColor(
            status
          )} rounded flex items-center px-2 text-white text-xs font-medium`}
          style={{
            left: `${(startOffset / totalDays) * 100}%`,
            width: `${(duration / totalDays) * 100}%`,
            minWidth: '60px',
          }}
        >
          <span className="truncate">{duration}d</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="w-28 flex-shrink-0">
        <Badge variant={getStatusBadgeVariant(status) as any}>
          {getStatusLabel(status)}
        </Badge>
      </div>
    </div>
  );
}

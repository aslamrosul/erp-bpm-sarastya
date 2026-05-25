import type { Task } from '../types/task.types';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import { Clock, User } from 'lucide-react';

interface KanbanTaskCardProps {
  task: Task;
}

export default function KanbanTaskCard({ task }: KanbanTaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium line-clamp-2">{task.title}</h4>
          <Badge variant={getPriorityColor(task.priority) as any}>
            {getPriorityLabel(task.priority)}
          </Badge>
        </div>

        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}

          {task.assigneeName && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {task.assigneeName.split(' ')[0]}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

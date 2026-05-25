import type { Task } from '../types/task.types';
import Badge from '../../../shared/components/badges/Badge';
import KanbanTaskCard from './KanbanTaskCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export default function KanbanColumn({ id, title, tasks, color }: KanbanColumnProps) {
  return (
    <div className={`${color} p-4 rounded-lg min-h-[500px]`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Badge variant="default">{tasks.length}</Badge>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-8">
            No tasks
          </div>
        ) : (
          tasks.map((task) => <KanbanTaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

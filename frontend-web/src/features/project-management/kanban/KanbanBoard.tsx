import { useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { TaskStatus } from '../types/task.types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  projectId?: string;
}

export default function KanbanBoard({ projectId }: KanbanBoardProps) {
  const { tasks, isLoading } = useTasks(projectId);

  const columns = useMemo(() => {
    const statuses: { id: TaskStatus; title: string; color: string }[] = [
      { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
      { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
      { id: 'review', title: 'Review', color: 'bg-yellow-50' },
      { id: 'done', title: 'Done', color: 'bg-green-50' },
    ];

    return statuses.map((status) => ({
      ...status,
      tasks: tasks.filter((task) => task.status === status.id),
    }));
  }, [tasks]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading tasks...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={column.tasks}
          color={column.color}
        />
      ))}
    </div>
  );
}

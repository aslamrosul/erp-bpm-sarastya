import { useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import Card from '../../../shared/components/cards/Card';
import { Calendar } from 'lucide-react';
import GanttRow from './GanttRow';

interface GanttChartProps {
  projectId?: string;
}

export default function GanttChart({ projectId }: GanttChartProps) {
  const { tasks, isLoading } = useTasks(projectId);

  const ganttData = useMemo(() => {
    const tasksWithDates = tasks.filter((task) => task.startDate && task.endDate);

    if (tasksWithDates.length === 0) return null;

    // Find min and max dates
    const allDates = tasksWithDates.flatMap((task) => [
      new Date(task.startDate!),
      new Date(task.endDate!),
    ]);

    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

    // Calculate total days
    const totalDays = Math.ceil(
      (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      minDate,
      maxDate,
      totalDays,
      tasks: tasksWithDates.map((task) => {
        const start = new Date(task.startDate!);
        const end = new Date(task.endDate!);
        const startOffset = Math.ceil(
          (start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const duration = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          ...task,
          startOffset,
          duration,
        };
      }),
    };
  }, [tasks]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading tasks...</div>;
  }

  if (!ganttData || ganttData.tasks.length === 0) {
    return (
      <Card>
        <div className="p-12 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Timeline Data</h3>
          <p className="text-sm text-muted-foreground">
            Tasks need start and end dates to display in Gantt view.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <div className="min-w-[800px] p-4">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Project Timeline</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div>Start: {ganttData.minDate.toLocaleDateString()}</div>
              <div>End: {ganttData.maxDate.toLocaleDateString()}</div>
              <div>Duration: {ganttData.totalDays} days</div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="space-y-3">
            {ganttData.tasks.map((task) => (
              <GanttRow
                key={task.id}
                title={task.title}
                status={task.status}
                startOffset={task.startOffset}
                duration={task.duration}
                totalDays={ganttData.totalDays}
                assigneeName={task.assigneeName}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>To Do</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

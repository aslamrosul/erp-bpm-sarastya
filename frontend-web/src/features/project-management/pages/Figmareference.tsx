import { useState } from 'react';
import { Plus, List, Calendar, LayoutGrid, Users, Clock } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  team: number;
  budget: number;
  tasks: { total: number; completed: number };
}

const projects: Project[] = [
  {
    id: 1,
    name: 'ERP Implementation',
    status: 'active',
    progress: 65,
    startDate: '2026-01-15',
    endDate: '2026-06-30',
    manager: 'Ahmad Fauzi',
    team: 8,
    budget: 500000000,
    tasks: { total: 45, completed: 29 },
  },
  {
    id: 2,
    name: 'Website Redesign',
    status: 'active',
    progress: 40,
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    manager: 'Maya Anggraini',
    team: 5,
    budget: 150000000,
    tasks: { total: 28, completed: 11 },
  },
  {
    id: 3,
    name: 'Mobile App Development',
    status: 'active',
    progress: 25,
    startDate: '2026-04-01',
    endDate: '2026-08-31',
    manager: 'Ahmad Fauzi',
    team: 6,
    budget: 300000000,
    tasks: { total: 52, completed: 13 },
  },
  {
    id: 4,
    name: 'CRM Integration',
    status: 'completed',
    progress: 100,
    startDate: '2025-11-01',
    endDate: '2026-02-28',
    manager: 'Budi Santoso',
    team: 4,
    budget: 200000000,
    tasks: { total: 32, completed: 32 },
  },
  {
    id: 5,
    name: 'Data Migration',
    status: 'active',
    progress: 80,
    startDate: '2026-02-15',
    endDate: '2026-05-15',
    manager: 'Siti Nurhaliza',
    team: 3,
    budget: 100000000,
    tasks: { total: 20, completed: 16 },
  },
  {
    id: 6,
    name: 'Security Audit',
    status: 'on-hold',
    progress: 15,
    startDate: '2026-03-15',
    endDate: '2026-06-15',
    manager: 'Ahmad Fauzi',
    team: 2,
    budget: 75000000,
    tasks: { total: 15, completed: 2 },
  },
];

interface Task {
  id: number;
  title: string;
  projectId: number;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee: string;
  priority: 'high' | 'medium' | 'low';
}

const tasks: Task[] = [
  { id: 1, title: 'Setup database schema', projectId: 1, status: 'done', assignee: 'Ahmad', priority: 'high' },
  { id: 2, title: 'API development', projectId: 1, status: 'in-progress', assignee: 'Farhan', priority: 'high' },
  { id: 3, title: 'UI/UX design review', projectId: 2, status: 'review', assignee: 'Maya', priority: 'medium' },
  { id: 4, title: 'Homepage redesign', projectId: 2, status: 'in-progress', assignee: 'Lisa', priority: 'high' },
  { id: 5, title: 'User testing', projectId: 2, status: 'todo', assignee: 'Rina', priority: 'low' },
  { id: 6, title: 'iOS app development', projectId: 3, status: 'in-progress', assignee: 'Dedi', priority: 'high' },
];

export default function ProjectManagementPage() {
  const [viewMode, setViewMode] = useState<'list' | 'gantt' | 'kanban'>('list');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'on-hold':
        return 'warning';
      default:
        return 'default';
    }
  };

  const kanbanColumns = [
    { id: 'todo', name: 'To Do', tasks: tasks.filter((t) => t.status === 'todo') },
    { id: 'in-progress', name: 'In Progress', tasks: tasks.filter((t) => t.status === 'in-progress') },
    { id: 'review', name: 'Review', tasks: tasks.filter((t) => t.status === 'review') },
    { id: 'done', name: 'Done', tasks: tasks.filter((t) => t.status === 'done') },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-foreground">Project Management</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Project Management</h1>
          <p className="text-sm text-muted-foreground">{projects.length} proyek aktif</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Proyek Baru
        </Button>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'list' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('list')}
          className="flex items-center gap-2"
        >
          <List className="w-4 h-4" />
          List
        </Button>
        <Button
          variant={viewMode === 'gantt' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('gantt')}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Gantt
        </Button>
        <Button
          variant={viewMode === 'kanban' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setViewMode('kanban')}
          className="flex items-center gap-2"
        >
          <LayoutGrid className="w-4 h-4" />
          Kanban
        </Button>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg">{project.name}</h3>
                    <Badge variant={getStatusColor(project.status) as any}>
                      {project.status === 'active' ? 'Active' : project.status === 'completed' ? 'Completed' : 'On Hold'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Manager</div>
                      <div className="text-sm flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">
                          {project.manager.charAt(0)}
                        </div>
                        {project.manager}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Team</div>
                      <div className="text-sm flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.team} members
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Budget</div>
                      <div className="text-sm">Rp {(project.budget / 1000000).toFixed(0)}M</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        Progress: {project.tasks.completed}/{project.tasks.total} tasks
                      </span>
                      <span className="text-xs">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#7B2D8B] h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Gantt View */}
      {viewMode === 'gantt' && (
        <Card title="Gantt Chart">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[200px_1fr] gap-4 mb-4">
                <div className="text-sm">Project</div>
                <div className="grid grid-cols-6 gap-2 text-xs text-muted-foreground text-center">
                  <div>Jan</div>
                  <div>Feb</div>
                  <div>Mar</div>
                  <div>Apr</div>
                  <div>May</div>
                  <div>Jun</div>
                </div>
              </div>

              {projects.map((project) => (
                <div key={project.id} className="grid grid-cols-[200px_1fr] gap-4 mb-3">
                  <div className="text-sm flex items-center">
                    <div className="truncate">{project.name}</div>
                  </div>
                  <div className="relative h-8">
                    <div className="absolute inset-0 grid grid-cols-6 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((month) => (
                        <div key={month} className="border-r border-border last:border-0" />
                      ))}
                    </div>
                    <div
                      className="absolute top-1 h-6 bg-[#7B2D8B] rounded flex items-center justify-center text-white text-xs"
                      style={{
                        left: '16.66%',
                        width: '50%',
                      }}
                    >
                      {project.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {kanbanColumns.map((column) => (
              <div key={column.id} className="w-80 flex-shrink-0">
                <Card>
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">{column.name}</h3>
                      <Badge variant="default">{column.tasks.length}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 min-h-[400px]">
                    {column.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm flex-1">{task.title}</h4>
                          <Badge
                            variant={
                              task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'
                            }
                          >
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7B2D8B] to-[#E91E8C] flex items-center justify-center text-white text-xs">
                            {task.assignee.charAt(0)}
                          </div>
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                    ))}

                    <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:border-[#7B2D8B] hover:text-[#7B2D8B] transition-colors">
                      + Tambah Task
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

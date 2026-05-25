import { useState } from 'react';
import { Plus, List, Calendar, LayoutGrid, Clock, Trash2 } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Badge from '../../../shared/components/badges/Badge';
import Button from '../../../shared/components/buttons/Button';
import { useProjects } from '../hooks/useProjects';
import { projectService } from '../services/project.service';
import KanbanBoard from '../kanban/KanbanBoard';
import GanttChart from '../gantt/GanttChart';
import { toISODateUTC } from '@/shared/utils/date.utils';

export default function ProjectManagementPage() {
  const { projects, loading, refetch } = useProjects();
  const [viewMode, setViewMode] = useState<'list' | 'gantt' | 'kanban'>('list');
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Active',
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  const handleCreateProject = async () => {
    try {
      await projectService.create({
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate ? toISODateUTC(formData.startDate) : undefined,
        endDate: formData.endDate ? toISODateUTC(formData.endDate) : undefined,
        status: formData.status,
      });

      setShowCreateForm(false);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Active',
      });

      await refetch();
    } catch (error) {
      console.error(error);
      alert('Gagal membuat project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    const confirmed = confirm('Hapus project ini?');
    if (!confirmed) return;

    try {
      await projectService.delete(id);
      await refetch();
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus project');
    }
  };

  if (loading) {
    return <div className="p-6">Loading projects...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Project Management</h1>
          <p className="text-sm text-muted-foreground">{projects.length} project tersedia</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4" />
          Proyek Baru
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card>
          <div className="space-y-4">
            <h2 className="text-lg">Tambah Project</h2>

            <input
              type="text"
              placeholder="Nama Project"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              placeholder="Deskripsi"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg p-3"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="border rounded-lg p-3"
              />

              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="border rounded-lg p-3"
              />
            </div>

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border rounded-lg p-3"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On-Hold">On-Hold</option>
            </select>

            <div className="flex gap-3">
              <Button variant="primary" onClick={handleCreateProject}>
                Simpan
              </Button>

              <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
                Batal
              </Button>
            </div>
          </div>
        </Card>
      )}

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

      {/* Project Filter for Kanban/Gantt */}
      {(viewMode === 'kanban' || viewMode === 'gantt') && (
        <Card>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Filter by Project:</label>
            <select
              value={selectedProjectId || ''}
              onChange={(e) => setSelectedProjectId(e.target.value || undefined)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Projects</option>
              {projects.map((project: any) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project: any) => (
            <Card key={project.id}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg">{project.name}</h3>
                    <Badge variant={getStatusColor(project.status) as any}>{project.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Owner</div>
                      <div className="text-sm">{project.ownerName || '-'}</div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Budget</div>
                      <div className="text-sm">
                        Rp {(project.budget / 1000000).toFixed(0)}M
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Tasks</div>
                      <div className="text-sm">
                        {project.completedTasks}/{project.totalTasks}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                      <div className="text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.startDate?.slice(0, 10)} - {project.endDate?.slice(0, 10)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        Progress
                      </span>

                      <span className="text-xs">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#7B2D8B] h-2 rounded-full transition-all"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" className="text-red-500" onClick={() => handleDeleteProject(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Gantt View */}
      {viewMode === 'gantt' && <GanttChart projectId={selectedProjectId} />}

      {/* Kanban View */}
      {viewMode === 'kanban' && <KanbanBoard projectId={selectedProjectId} />}
    </div>
  );
}

import { api } from '../../../shared/services/api';
import type { Task, CreateTaskInput, UpdateTaskInput, TaskStatus, TaskPriority } from '../types/task.types';

// Map backend enum string to frontend format
const mapBackendStatus = (status: string): TaskStatus => {
  const statusMap: Record<string, TaskStatus> = {
    'Todo': 'todo',
    'InProgress': 'in-progress',
    'Review': 'review',
    'Done': 'done',
    'Cancelled': 'cancelled',
  };
  return statusMap[status] || 'todo';
};

const mapBackendPriority = (priority: string): TaskPriority => {
  const priorityMap: Record<string, TaskPriority> = {
    'Low': 'low',
    'Medium': 'medium',
    'High': 'high',
    'Urgent': 'urgent',
  };
  return priorityMap[priority] || 'medium';
};

// Map frontend format to backend enum
const mapFrontendStatus = (status: TaskStatus): string => {
  const statusMap: Record<TaskStatus, string> = {
    'todo': 'Todo',
    'in-progress': 'InProgress',
    'review': 'Review',
    'done': 'Done',
    'cancelled': 'Cancelled',
  };
  return statusMap[status];
};

const mapFrontendPriority = (priority: TaskPriority): string => {
  const priorityMap: Record<TaskPriority, string> = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'urgent': 'Urgent',
  };
  return priorityMap[priority];
};

const mapTaskFromBackend = (backendTask: any): Task => ({
  ...backendTask,
  status: mapBackendStatus(backendTask.status),
  priority: mapBackendPriority(backendTask.priority),
});

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data.map(mapTaskFromBackend);
  },

  getByProject: async (projectId: string): Promise<Task[]> => {
    const response = await api.get(`/tasks?projectId=${projectId}`);
    return response.data.map(mapTaskFromBackend);
  },

  getById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return mapTaskFromBackend(response.data);
  },

  create: async (data: CreateTaskInput): Promise<Task> => {
    const backendData = {
      ...data,
      status: mapFrontendStatus(data.status),
      priority: mapFrontendPriority(data.priority),
    };
    const response = await api.post('/tasks', backendData);
    return mapTaskFromBackend(response.data);
  },

  update: async (id: string, data: UpdateTaskInput): Promise<Task> => {
    const backendData = {
      ...data,
      status: mapFrontendStatus(data.status),
      priority: mapFrontendPriority(data.priority),
    };
    const response = await api.put(`/tasks/${id}`, backendData);
    return mapTaskFromBackend(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

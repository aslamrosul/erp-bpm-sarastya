export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
  projectId: string;
  projectName?: string;
  assigneeId?: string;
  assigneeName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
  projectId: string;
  assigneeId?: string;
}

export interface UpdateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
  assigneeId?: string;
}

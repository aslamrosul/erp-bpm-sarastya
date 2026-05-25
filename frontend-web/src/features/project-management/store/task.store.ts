import { create } from 'zustand';
import type { Task } from '../types/task.types';

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (task: Task | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Task) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  setTasks: (tasks) => set({ tasks }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? task : t)),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));

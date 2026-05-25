import { useEffect } from 'react';
import { useTaskStore } from '../store/task.store';
import { taskService } from '../services/task.service';
import type { CreateTaskInput, UpdateTaskInput } from '../types/task.types';

export const useTasks = (projectId?: string) => {
  const {
    tasks,
    selectedTask,
    isLoading,
    error,
    setTasks,
    setSelectedTask,
    setLoading,
    setError,
    addTask,
    updateTask: updateTaskInStore,
    removeTask,
  } = useTaskStore();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = projectId
        ? await taskService.getByProject(projectId)
        : await taskService.getAll();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (input: CreateTaskInput) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await taskService.create(input);
      addTask(newTask);
      return newTask;
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, input: UpdateTaskInput) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTask = await taskService.update(id, input);
      updateTaskInStore(id, updatedTask);
      return updatedTask;
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await taskService.delete(id);
      removeTask(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    tasks,
    selectedTask,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setSelectedTask,
  };
};

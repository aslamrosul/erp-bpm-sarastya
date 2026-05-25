import { api } from '@/shared/services/api';
import { Department, CreateDepartmentDto, UpdateDepartmentDto } from '../types/department.types';

export const departmentService = {
  getAll: async (): Promise<Department[]> => {
    const response = await api.get('/departments');
    return response.data;
  },

  getById: async (id: string): Promise<Department> => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },

  create: async (data: CreateDepartmentDto): Promise<Department> => {
    const response = await api.post('/departments', data);
    return response.data;
  },

  update: async (id: string, data: UpdateDepartmentDto): Promise<Department> => {
    const response = await api.put(`/departments/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/departments/${id}`);
  },
};

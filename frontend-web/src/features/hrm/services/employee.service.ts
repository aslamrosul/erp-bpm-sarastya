import { api } from '@/shared/services/api';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../types/employee.types';

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get('/employees');
    return response.data;
  },

  getById: async (id: string): Promise<Employee> => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  create: async (data: CreateEmployeeDto): Promise<Employee> => {
    const response = await api.post('/employees', data);
    return response.data;
  },

  update: async (id: string, data: UpdateEmployeeDto): Promise<Employee> => {
    const response = await api.put(`/employees/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },
};

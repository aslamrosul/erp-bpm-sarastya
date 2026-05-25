import { api } from '../../../shared/services/api';
import { Project, CreateProjectDto } from '../types/project.types';

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (data: CreateProjectDto): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateProjectDto>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

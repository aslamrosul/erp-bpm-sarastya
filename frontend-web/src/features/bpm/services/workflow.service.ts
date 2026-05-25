import { api } from '../../../shared/services/api';

export const workflowService = {
  getAll: async () => {
    const response = await api.get('/workflow');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/workflow/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/workflow', data);
    return response.data;
  },

  execute: async (id: string, data: any) => {
    const response = await api.post(`/workflow/${id}/execute`, data);
    return response.data;
  },
};

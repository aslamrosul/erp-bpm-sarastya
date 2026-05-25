import { api } from '@/shared/services/api';
import { Position, CreatePositionDto, UpdatePositionDto } from '../types/position.types';

export const positionService = {
  getAll: async (): Promise<Position[]> => {
    const response = await api.get('/positions');
    return response.data;
  },

  getById: async (id: string): Promise<Position> => {
    const response = await api.get(`/positions/${id}`);
    return response.data;
  },

  create: async (data: CreatePositionDto): Promise<Position> => {
    const response = await api.post('/positions', data);
    return response.data;
  },

  update: async (id: string, data: UpdatePositionDto): Promise<Position> => {
    const response = await api.put(`/positions/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/positions/${id}`);
  },
};

import { api } from '../../../shared/services/api';

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const authService = {
  login: async (data: LoginDto) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterDto) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

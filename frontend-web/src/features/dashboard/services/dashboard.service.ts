import { api } from '../../../shared/services/api';

export interface DashboardData {
  totalUsers: number;
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  activeProjects: number;
  projectStatus: Array<{
    name: string;
    value: number;
  }>;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
  }>;
}

export const dashboardService = {
  getDashboard: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/dashboard');
    return response.data;
  },
};

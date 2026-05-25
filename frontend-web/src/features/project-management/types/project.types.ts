export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold';
  startDate: string;
  endDate?: string;
  progress: number;
  budget: number;
  totalTasks: number;
  completedTasks: number;
  teamCount: number;
  ownerId: string;
  ownerName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

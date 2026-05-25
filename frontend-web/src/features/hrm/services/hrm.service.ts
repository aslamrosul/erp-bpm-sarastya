import { api } from '../../../shared/services/api';

export const hrmService = {
  getEmployees: async () => {
    const response = await api.get('/hrm/employees');
    return response.data;
  },

  getDepartments: async () => {
    const response = await api.get('/hrm/departments');
    return response.data;
  },

  getLeaveRequests: async () => {
    const response = await api.get('/hrm/leave-requests');
    return response.data;
  },

  getTimesheets: async () => {
    const response = await api.get('/hrm/timesheets');
    return response.data;
  },
};

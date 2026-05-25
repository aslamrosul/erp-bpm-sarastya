import { api } from '../../../shared/services/api';

export const crmService = {
  getCustomers: async () => {
    const response = await api.get('/crm/customers');
    return response.data;
  },

  getLeads: async () => {
    const response = await api.get('/crm/leads');
    return response.data;
  },

  getActivities: async () => {
    const response = await api.get('/crm/activities');
    return response.data;
  },

  getPipeline: async () => {
    const response = await api.get('/crm/pipeline');
    return response.data;
  },
};

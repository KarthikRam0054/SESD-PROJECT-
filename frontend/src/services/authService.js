import api from './api';

export const authService = {
  login: async (identifier, password) => {
    const res = await api.post('/api/auth/login', { identifier, password });
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/api/auth/register', userData);
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get('/api/auth/profile');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await api.put('/api/auth/profile', data);
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await api.post('/api/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (email, code, newPassword) => {
    const res = await api.post('/api/auth/reset-password', { email, code, newPassword });
    return res.data;
  }
};


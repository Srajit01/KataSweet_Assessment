import api from '../utils/api';

export const authService = {
  async register(email, password, role = 'user') {
    const response = await api.post('/auth/register', {
      email,
      password,
      role
    });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    return response.data;
  }
};
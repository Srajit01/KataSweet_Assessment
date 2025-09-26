import api from '../utils/api';

export const sweetService = {
  async getSweets(page = 1, limit = 10) {
    const response = await api.get(`/sweets?page=${page}&limit=${limit}`);
    return response.data;
  },

  async searchSweets(params) {
    const queryParams = new URLSearchParams();
    
    if (params.name) queryParams.append('name', params.name);
    if (params.category) queryParams.append('category', params.category);
    if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());

    const response = await api.get(`/sweets/search?${queryParams}`);
    return response.data;
  },

  async createSweet(sweetData) {
    const response = await api.post('/sweets', sweetData);
    return response.data;
  },

  async updateSweet(id, sweetData) {
    const response = await api.put(`/sweets/${id}`, sweetData);
    return response.data;
  },

  async deleteSweet(id) {
    const response = await api.delete(`/sweets/${id}`);
    return response.data;
  },

  async purchaseSweet(id, data) {
    const response = await api.post(`/sweets/${id}/purchase`, data);
    return response.data;
  },

  async restockSweet(id, data) {
    const response = await api.post(`/sweets/${id}/restock`, data);
    return response.data;
  }
};
import api from './api';

export const propertyService = {
  getProperties: async (params = {}) => {
    const res = await api.get('/api/properties', { params });
    return res.data;
  },

  getHomeShowcase: async () => {
    const res = await api.get('/api/properties/home-showcase');
    return res.data;
  },

  getPropertyById: async (id) => {
    const res = await api.get(`/api/properties/${id}`);
    return res.data;
  },

  createProperty: async (propertyData) => {
    const res = await api.post('/api/properties', propertyData);
    return res.data;
  },

  updateProperty: async (id, propertyData) => {
    const res = await api.put(`/api/properties/${id}`, propertyData);
    return res.data;
  },

  updatePropertyStatus: async (id, status) => {
    const res = await api.patch(`/api/properties/${id}/status`, { status });
    return res.data;
  },

  deleteProperty: async (id) => {
    const res = await api.delete(`/api/properties/${id}`);
    return res.data;
  },

  getMyListings: async () => {
    const res = await api.get('/api/properties/user/my-listings');
    return res.data;
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await api.post('/api/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },

  uploadMultipleImages: async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });
    const res = await api.post('/api/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};


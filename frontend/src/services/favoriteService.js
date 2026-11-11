import api from './api';

export const favoriteService = {
  getFavorites: async () => {
    const res = await api.get('/api/favorites');
    return res.data;
  },

  addFavorite: async (propertyId) => {
    const res = await api.post(`/api/favorites/${propertyId}`);
    return res.data;
  },

  removeFavorite: async (propertyId) => {
    const res = await api.delete(`/api/favorites/${propertyId}`);
    return res.data;
  }
};


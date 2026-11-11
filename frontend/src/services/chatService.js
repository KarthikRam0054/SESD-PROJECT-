import api from './api';

export const chatService = {
  getConversations: async () => {
    const res = await api.get('/api/conversations');
    return res.data;
  },

  getOrCreateConversation: async (propertyId, initialMessage = '') => {
    const res = await api.post('/api/conversations', { propertyId, initialMessage });
    return res.data;
  },

  getMessages: async (conversationId) => {
    const res = await api.get(`/api/conversations/${conversationId}/messages`);
    return res.data;
  },

  sendMessage: async (conversationId, message) => {
    const res = await api.post('/api/conversations/messages', { conversationId, message });
    return res.data;
  }
};


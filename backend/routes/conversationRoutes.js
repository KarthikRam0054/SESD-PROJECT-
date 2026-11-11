const express = require('express');
const router = express.Router();
const {
  getConversations,
  getOrCreateConversation,
  getMessages,
  sendMessage
} = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getConversations);
router.post('/', protect, getOrCreateConversation);
router.get('/:conversationId/messages', protect, getMessages);
router.get('/messages/:conversationId', protect, getMessages); // support both URL patterns
router.post('/messages', protect, sendMessage);

module.exports = router;


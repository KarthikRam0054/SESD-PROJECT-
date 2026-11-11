const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const initChatSocket = (io) => {
  const onlineUsers = new Map(); // userId -> Set of socket.ids

  io.on('connection', (socket) => {
    // console.log(`[Socket] Client connected: ${socket.id}`);

    // Register user presence
    socket.on('register_user', (userId) => {
      if (!userId) return;
      socket.userId = userId.toString();
      socket.join(`user_${userId}`);

      if (!onlineUsers.has(userId.toString())) {
        onlineUsers.set(userId.toString(), new Set());
      }
      onlineUsers.get(userId.toString()).add(socket.id);

      io.emit('online_users_list', Array.from(onlineUsers.keys()));
    });

    // Join a specific conversation room
    socket.on('join_conversation', (conversationId) => {
      if (!conversationId) return;
      socket.join(`conv_${conversationId}`);
    });

    // Leave a specific conversation room
    socket.on('leave_conversation', (conversationId) => {
      if (!conversationId) return;
      socket.leave(`conv_${conversationId}`);
    });

    // Send real-time message
    socket.on('send_message', async (data) => {
      try {
        const { conversationId, senderId, recipientId, message } = data;

        if (!conversationId || !senderId || !message || message.trim() === '') {
          return socket.emit('error', { message: 'Invalid message payload' });
        }

        // Persist message to DB
        const newMsg = await Message.create({
          conversation: conversationId,
          sender: senderId,
          recipient: recipientId,
          message: message.trim(),
          readStatus: false
        });

        const conversation = await Conversation.findById(conversationId);
        if (conversation) {
          conversation.lastMessage = message.trim();
          conversation.lastMessageSender = senderId;
          conversation.lastMessageAt = new Date();

          if (conversation.buyer.toString() === senderId.toString()) {
            conversation.unreadOwnerCount += 1;
          } else {
            conversation.unreadBuyerCount += 1;
          }
          await conversation.save();
        }

        const populatedMsg = await Message.findById(newMsg._id).populate(
          'sender',
          'fullName profileImage'
        );

        // Emit to the conversation room
        io.to(`conv_${conversationId}`).emit('new_message', populatedMsg);

        // Also notify the recipient in their personal room for push notifications / badge counts
        if (recipientId) {
          io.to(`user_${recipientId}`).emit('conversation_updated', {
            conversationId,
            lastMessage: message.trim(),
            lastMessageAt: newMsg.createdAt,
            senderId
          });
        }
      } catch (err) {
        console.error('[Socket Error] send_message:', err);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicators
    socket.on('typing', ({ conversationId, userId, isTyping }) => {
      socket.to(`conv_${conversationId}`).emit('user_typing', {
        conversationId,
        userId,
        isTyping
      });
    });

    // Mark messages as read
    socket.on('mark_read', async ({ conversationId, userId }) => {
      try {
        await Message.updateMany(
          { conversation: conversationId, recipient: userId, readStatus: false },
          { $set: { readStatus: true, readAt: new Date() } }
        );

        const conv = await Conversation.findById(conversationId);
        if (conv) {
          if (conv.buyer.toString() === userId.toString()) {
            conv.unreadBuyerCount = 0;
          } else if (conv.owner.toString() === userId.toString()) {
            conv.unreadOwnerCount = 0;
          }
          await conv.save();
        }

        io.to(`conv_${conversationId}`).emit('messages_marked_read', {
          conversationId,
          userId
        });
      } catch (err) {
        console.error('[Socket Error] mark_read:', err);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      if (socket.userId && onlineUsers.has(socket.userId)) {
        const userSockets = onlineUsers.get(socket.userId);
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          onlineUsers.delete(socket.userId);
        }
        io.emit('online_users_list', Array.from(onlineUsers.keys()));
      }
    });
  });
};

module.exports = initChatSocket;


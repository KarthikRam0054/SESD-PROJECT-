const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Property = require('../models/Property');

// @desc    Get all conversations for logged-in user
// @route   GET /api/conversations
// @access  Private
const getConversations = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      $or: [{ buyer: userId }, { owner: userId }]
    })
      .populate('property', 'title price listingType location images coverImage status category')
      .populate('buyer', 'fullName profileImage isVerified phone email')
      .populate('owner', 'fullName profileImage isVerified phone email')
      .sort({ updatedAt: -1 });

    return res.json({
      success: true,
      count: conversations.length,
      conversations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get or create conversation for a property (with optional initial message)
// @route   POST /api/conversations
// @access  Private
const getOrCreateConversation = async (req, res, next) => {
  try {
    const { propertyId, initialMessage } = req.body;
    const buyerId = req.user._id;

    if (!propertyId) {
      return res.status(400).json({ success: false, message: 'Property ID is required' });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Owner cannot start conversation with themselves
    if (property.owner.toString() === buyerId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You are the owner of this property. You cannot start a conversation with yourself.'
      });
    }

    let conversation = await Conversation.findOne({
      property: propertyId,
      buyer: buyerId
    });

    let messageCreated = null;

    if (!conversation) {
      conversation = await Conversation.create({
        property: propertyId,
        buyer: buyerId,
        owner: property.owner,
        lastMessage: initialMessage || '',
        lastMessageSender: buyerId,
        lastMessageAt: new Date(),
        unreadOwnerCount: initialMessage ? 1 : 0
      });

      // Increment property inquiries count
      await Property.findByIdAndUpdate(propertyId, { $inc: { inquiriesCount: 1 } });
    }

    // If an initial message is provided (e.g. "I'm Interested"), create message record
    if (initialMessage && initialMessage.trim() !== '') {
      messageCreated = await Message.create({
        conversation: conversation._id,
        sender: buyerId,
        recipient: property.owner,
        message: initialMessage.trim(),
        readStatus: false
      });

      conversation.lastMessage = initialMessage.trim();
      conversation.lastMessageSender = buyerId;
      conversation.lastMessageAt = new Date();
      conversation.unreadOwnerCount += 1;
      await conversation.save();
    }

    const populated = await Conversation.findById(conversation._id)
      .populate('property', 'title price listingType location images coverImage status category')
      .populate('buyer', 'fullName profileImage isVerified phone email')
      .populate('owner', 'fullName profileImage isVerified phone email');

    return res.status(200).json({
      success: true,
      conversation: populated,
      createdMessage: messageCreated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages for a conversation
// @route   GET /api/messages/:conversationId
// @access  Private
const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    // Authorization check: only participants can view
    const isBuyer = conversation.buyer.toString() === userId.toString();
    const isOwner = conversation.owner.toString() === userId.toString();

    if (!isBuyer && !isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this conversation' });
    }

    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'fullName profileImage')
      .sort({ createdAt: 1 });

    // Mark messages as read where current user is recipient
    await Message.updateMany(
      {
        conversation: conversationId,
        recipient: userId,
        readStatus: false
      },
      {
        $set: { readStatus: true, readAt: new Date() }
      }
    );

    // Reset unread counter for current user
    if (isBuyer) {
      conversation.unreadBuyerCount = 0;
    } else {
      conversation.unreadOwnerCount = 0;
    }
    await conversation.save();

    return res.json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send a message in a conversation
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body;
    const userId = req.user._id;

    if (!conversationId || !message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Conversation ID and message text are required' });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    // Authorization check
    const isBuyer = conversation.buyer.toString() === userId.toString();
    const isOwner = conversation.owner.toString() === userId.toString();

    if (!isBuyer && !isOwner) {
      return res.status(403).json({ success: false, message: 'Not authorized to send messages in this conversation' });
    }

    const recipientId = isBuyer ? conversation.owner : conversation.buyer;

    const newMessage = await Message.create({
      conversation: conversationId,
      sender: userId,
      recipient: recipientId,
      message: message.trim(),
      readStatus: false
    });

    // Update conversation metadata
    conversation.lastMessage = message.trim();
    conversation.lastMessageSender = userId;
    conversation.lastMessageAt = new Date();
    if (isBuyer) {
      conversation.unreadOwnerCount += 1;
    } else {
      conversation.unreadBuyerCount += 1;
    }
    await conversation.save();

    const populated = await Message.findById(newMessage._id).populate('sender', 'fullName profileImage');

    return res.status(201).json({
      success: true,
      message: populated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getOrCreateConversation,
  getMessages,
  sendMessage
};


import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Building2,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  Check,
  CheckCheck,
  ExternalLink
} from 'lucide-react';
import { formatTime, formatPrice } from '../../utils/formatters';
import { chatService } from '../../services/chatService';
import { useSocket } from '../../context/SocketContext';
import { useToast } from '../../context/ToastContext';

const ChatWindow = ({
  conversation,
  currentUserId,
  onBack,
  onMessageSent
}) => {
  const { socket, onlineUsers } = useSocket();
  const { error } = useToast();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const otherUser =
    conversation.buyer?._id === currentUserId
      ? conversation.owner
      : conversation.buyer;

  const isOtherUserOnline = onlineUsers.includes(otherUser?._id);

  // Load initial messages for selected conversation
  useEffect(() => {
    let isMounted = true;
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const data = await chatService.getMessages(conversation._id);
        if (isMounted) {
          setMessages(data.messages || []);
        }
      } catch (err) {
        error('Failed to load conversation history');
      } finally {
        if (isMounted) setLoadingMessages(false);
      }
    };

    fetchMessages();

    // Join Socket conversation room
    if (socket) {
      socket.emit('join_conversation', conversation._id);
      socket.emit('mark_read', {
        conversationId: conversation._id,
        userId: currentUserId
      });
    }

    return () => {
      isMounted = false;
      if (socket) {
        socket.emit('leave_conversation', conversation._id);
      }
    };
  }, [conversation._id, socket]);

  // Listen to Socket.IO real-time messages & typing
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (msg.conversation === conversation._id || msg.conversation?._id === conversation._id) {
        setMessages((prev) => [...prev, msg]);
        // Acknowledge read if recipient
        if (msg.recipient === currentUserId) {
          socket.emit('mark_read', {
            conversationId: conversation._id,
            userId: currentUserId
          });
        }
      }
    };

    const handleUserTyping = (data) => {
      if (data.conversationId === conversation._id && data.userId !== currentUserId) {
        setOtherUserTyping(data.isTyping);
      }
    };

    const handleMessagesRead = (data) => {
      if (data.conversationId === conversation._id) {
        setMessages((prev) =>
          prev.map((m) => (m.sender !== currentUserId ? m : { ...m, readStatus: true }))
        );
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('messages_marked_read', handleMessagesRead);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('messages_marked_read', handleMessagesRead);
    };
  }, [socket, conversation._id, currentUserId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, otherUserTyping]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);

    if (socket) {
      socket.emit('typing', {
        conversationId: conversation._id,
        userId: currentUserId,
        isTyping: true
      });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', {
          conversationId: conversation._id,
          userId: currentUserId,
          isTyping: false
        });
      }, 1500);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText('');

    if (socket) {
      socket.emit('typing', {
        conversationId: conversation._id,
        userId: currentUserId,
        isTyping: false
      });
      // Send real-time via socket
      socket.emit('send_message', {
        conversationId: conversation._id,
        senderId: currentUserId,
        recipientId: otherUser?._id,
        message: text
      });
    } else {
      // Fallback to REST API
      try {
        const res = await chatService.sendMessage(conversation._id, text);
        setMessages((prev) => [...prev, res.message]);
      } catch (err) {
        error('Failed to send message');
      }
    }

    if (onMessageSent) onMessageSent(text);
  };

  const prop = conversation.property;

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      {/* Top Participant Header */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="relative">
            <img
              src={
                otherUser?.profileImage ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
              }
              alt={otherUser?.fullName || 'User'}
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-100"
            />
            {isOtherUserOnline && (
              <span
                title="Online Now"
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"
              />
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-[#142B4A] text-base">
                {otherUser?.fullName || 'Property Owner'}
              </h3>
              {otherUser?.isVerified && (
                <ShieldCheck className="w-4 h-4 text-[#14B8A6]" title="Verified User" />
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {isOtherUserOnline ? (
                <span className="text-emerald-600 font-bold">Online Now</span>
              ) : (
                'Active on REALTOR'
              )}
            </p>
          </div>
        </div>

        {prop && (
          <Link
            to={`/properties/${prop._id}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#14B8A6] hover:text-white text-xs font-bold text-[#142B4A] transition-all"
          >
            <span>View Property</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Property Information Banner Pinned Inside Chat */}
      {prop && (
        <div className="bg-white/90 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={prop.coverImage || (prop.images && prop.images[0]) || ''}
              alt={prop.title}
              className="w-14 h-11 rounded-xl object-cover shrink-0 shadow-sm border border-slate-200"
            />
            <div className="overflow-hidden">
              <h4 className="font-bold text-xs text-[#142B4A] truncate max-w-sm">
                {prop.title}
              </h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-[#14B8A6] shrink-0" />
                <span>{prop.location?.area}, {prop.location?.city}</span>
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-black text-sm text-[#14B8A6]">
              {formatPrice(prop.price, prop.listingType)}
            </span>
            <span className="block text-[10px] uppercase font-bold text-slate-400">
              {prop.category}
            </span>
          </div>
        </div>
      )}

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {loadingMessages ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-xs">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#14B8A6] flex items-center justify-center mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#142B4A]">Start the Conversation</p>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Ask about visit timings, documentation, maintenance fees, or price negotiation.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const senderId = msg.sender?._id || msg.sender;
            const isMine = senderId === currentUserId;

            return (
              <div
                key={msg._id || index}
                className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                {!isMine && (
                  <img
                    src={
                      msg.sender?.profileImage ||
                      otherUser?.profileImage ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                    }
                    alt="Sender"
                    className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 ring-1 ring-slate-200"
                  />
                )}

                <div
                  className={`max-w-[75%] sm:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isMine
                      ? 'bg-[#142B4A] text-white rounded-br-none'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                  }`}
                >
                  <p className="break-words font-medium">{msg.message}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isMine ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    <span>{formatTime(msg.createdAt)}</span>
                    {isMine && (
                      <span>
                        {msg.readStatus ? (
                          <CheckCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Real-time Typing Bubble */}
        {otherUserTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
            <span>{otherUser?.fullName || 'User'} is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bottom Bar */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputText}
          onChange={handleInputChange}
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] focus:bg-white transition-all font-medium"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3.5 rounded-2xl bg-[#14B8A6] hover:bg-[#0d9488] text-white shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send Message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;


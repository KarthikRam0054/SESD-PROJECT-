import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessageSquare, Building2 } from 'lucide-react';
import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';
import { chatService } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useToast } from '../context/ToastContext';

const MessagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { socket, setUnreadCount } = useSocket();
  const { error } = useToast();

  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(
    searchParams.get('conversationId') || null
  );
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load user conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await chatService.getConversations();
      setConversations(data.conversations || []);

      // If a conversationId param was in URL, select it, otherwise select first conversation on desktop
      const queryId = searchParams.get('conversationId');
      if (queryId) {
        setSelectedConversationId(queryId);
      } else if (data.conversations?.length > 0 && window.innerWidth >= 768) {
        setSelectedConversationId(data.conversations[0]._id);
      }
    } catch (err) {
      error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    }
  }, [isAuthenticated]);

  // Listen for socket events to update conversation preview in list
  useEffect(() => {
    if (!socket) return;

    const handleConvUpdated = (data) => {
      setConversations((prev) =>
        prev.map((c) =>
          c._id === data.conversationId
            ? {
                ...c,
                lastMessage: data.lastMessage,
                lastMessageAt: data.lastMessageAt || new Date()
              }
            : c
        )
      );
    };

    socket.on('conversation_updated', handleConvUpdated);
    return () => {
      socket.off('conversation_updated', handleConvUpdated);
    };
  }, [socket]);

  const handleSelectConversation = (id) => {
    setSelectedConversationId(id);
    setSearchParams({ conversationId: id }, { replace: true });
  };

  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden h-[calc(100vh-140px)] min-h-[580px] grid grid-cols-1 md:grid-cols-12">
        {/* Left: Conversation List (Hidden on mobile if a conversation is open) */}
        <div
          className={`md:col-span-5 lg:col-span-4 h-full ${
            selectedConversationId ? 'hidden md:block' : 'block'
          }`}
        >
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            currentUserId={user?._id}
          />
        </div>

        {/* Right: Active Chat Window (Full on mobile if open) */}
        <div
          className={`md:col-span-7 lg:col-span-8 h-full bg-[#F5F7FA] ${
            !selectedConversationId ? 'hidden md:flex' : 'flex flex-col'
          }`}
        >
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              currentUserId={user?._id}
              onBack={() => {
                setSelectedConversationId(null);
                setSearchParams({}, { replace: true });
              }}
              onMessageSent={(msgText) => {
                setConversations((prev) =>
                  prev.map((c) =>
                    c._id === selectedConversation._id
                      ? { ...c, lastMessage: msgText, lastMessageAt: new Date() }
                      : c
                  )
                );
              }}
            />
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 rounded-3xl bg-teal-50 text-[#14B8A6] flex items-center justify-center mb-4 shadow-inner">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#142B4A]">Your Messages</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1">
                Select a conversation on the left to start messaging with buyers and property owners.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;


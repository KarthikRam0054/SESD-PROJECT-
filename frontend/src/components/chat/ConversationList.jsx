import React, { useState } from 'react';
import { Search, Building2, User, Check, CheckCheck } from 'lucide-react';
import { formatTime, formatDate } from '../../utils/formatters';

const ConversationList = ({
  conversations = [],
  selectedConversationId,
  onSelectConversation,
  currentUserId
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter((c) => {
    const otherUser = c.buyer?._id === currentUserId ? c.owner : c.buyer;
    const searchTarget = `${otherUser?.fullName || ''} ${c.property?.title || ''} ${c.lastMessage || ''}`.toLowerCase();
    return searchTarget.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      {/* Search Bar */}
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-xl font-extrabold text-[#142B4A] mb-3">Messages</h2>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search conversations or properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#14B8A6] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Conversations Scroll Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => {
            const isSelected = selectedConversationId === conv._id;
            const otherUser = conv.buyer?._id === currentUserId ? conv.owner : conv.buyer;
            const isBuyer = conv.buyer?._id === currentUserId;
            const unreadCount = isBuyer ? conv.unreadBuyerCount : conv.unreadOwnerCount;

            return (
              <button
                key={conv._id}
                onClick={() => onSelectConversation(conv._id)}
                className={`w-full text-left p-4 transition-all flex items-start gap-3 hover:bg-slate-50/80 ${
                  isSelected ? 'bg-teal-50/60 border-l-4 border-[#14B8A6]' : ''
                }`}
              >
                {/* User Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={
                      otherUser?.profileImage ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                    }
                    alt={otherUser?.fullName || 'User'}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                  />
                  {otherUser?.isVerified && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#14B8A6] rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Details snippet */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="font-bold text-sm text-[#142B4A] truncate">
                      {otherUser?.fullName || 'User'}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {conv.lastMessageAt ? formatTime(conv.lastMessageAt) : ''}
                    </span>
                  </div>

                  {/* Property Title Tag */}
                  {conv.property && (
                    <p className="text-[11px] font-semibold text-[#14B8A6] truncate flex items-center gap-1 mb-1">
                      <Building2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{conv.property.title}</span>
                    </p>
                  )}

                  {/* Last Message Preview */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 truncate max-w-[190px]">
                      {conv.lastMessage || 'Started conversation'}
                    </p>

                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            {searchTerm ? 'No matching conversations' : 'No messages yet. Send an inquiry from any property listing!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Send,
  EyeOff,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { chatService } from '../../services/chatService';

const OwnerContactCard = ({ owner, propertyId, propertyTitle }) => {
  const { user, isAuthenticated } = useAuth();
  const { success, error, info } = useToast();
  const navigate = useNavigate();
  const [interestLoading, setInterestLoading] = useState(false);

  if (!owner) return null;

  const isSelf = isAuthenticated && user?._id === owner._id;

  const handleInterestedClick = async () => {
    if (!isAuthenticated) {
      info('Please sign in to contact the property owner.');
      navigate('/login');
      return;
    }

    if (isSelf) {
      info('You are the owner of this property.');
      return;
    }

    try {
      setInterestLoading(true);
      const automatedMsg = "Hello, I'm interested in your property. Could you please share more details?";
      const data = await chatService.getOrCreateConversation(propertyId, automatedMsg);

      success('Message sent! Connecting you to the owner...');
      navigate(`/messages?conversationId=${data.conversation._id}`);
    } catch (err) {
      error(err.customMessage || 'Failed to start conversation with owner');
    } finally {
      setInterestLoading(false);
    }
  };

  const handleStartChat = async () => {
    if (!isAuthenticated) {
      info('Please sign in to start a chat.');
      navigate('/login');
      return;
    }

    if (isSelf) {
      info('You cannot chat with yourself.');
      return;
    }

    try {
      const data = await chatService.getOrCreateConversation(propertyId);
      navigate(`/messages?conversationId=${data.conversation._id}`);
    } catch (err) {
      error(err.customMessage || 'Failed to open conversation');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-6">
      {/* Header / Owner Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={
              owner.profileImage ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            }
            alt={owner.fullName}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#14B8A6]/20 shadow-md"
          />
          {owner.isVerified && (
            <span
              title="Verified Owner"
              className="absolute -bottom-1 -right-1 bg-[#14B8A6] text-white p-1 rounded-full shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-extrabold text-[#142B4A] truncate">
              {owner.fullName}
            </h4>
          </div>

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {owner.role === 'owner' ? 'Property Owner / Seller' : 'Registered Member'}
          </p>

          {owner.isVerified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#14B8A6] mt-0.5">
              <UserCheck className="w-3 h-3" />
              <span>Identity Verified</span>
            </span>
          )}
        </div>
      </div>

      {owner.bio && (
        <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
          "{owner.bio}"
        </p>
      )}

      {/* Owner Contact Information (With Privacy Considerations) */}
      <div className="space-y-2.5 text-xs">
        {/* Phone */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F7FA]">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Phone className="w-4 h-4 text-[#142B4A]" />
            <span>Phone</span>
          </div>
          {owner.hidePhone ? (
            <span className="text-slate-400 font-medium flex items-center gap-1 italic">
              <EyeOff className="w-3.5 h-3.5" /> Hidden by Owner
            </span>
          ) : (
            <a
              href={`tel:${owner.phone}`}
              className="font-bold text-[#142B4A] hover:text-[#14B8A6] transition-colors"
            >
              {owner.phone || 'Available via Chat'}
            </a>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F7FA]">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Mail className="w-4 h-4 text-[#142B4A]" />
            <span>Email</span>
          </div>
          {owner.hideEmail ? (
            <span className="text-slate-400 font-medium flex items-center gap-1 italic">
              <EyeOff className="w-3.5 h-3.5" /> Hidden by Owner
            </span>
          ) : (
            <a
              href={`mailto:${owner.email}`}
              className="font-bold text-[#142B4A] hover:text-[#14B8A6] transition-colors truncate max-w-[170px]"
            >
              {owner.email}
            </a>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        {/* "I'm Interested" 1-Click Trigger */}
        <button
          onClick={handleInterestedClick}
          disabled={interestLoading || isSelf}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#14B8A6] hover:bg-[#0d9488] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{interestLoading ? 'Sending Inquiry...' : "I'm Interested"}</span>
        </button>

        {/* Start Chat Button */}
        <button
          onClick={handleStartChat}
          disabled={isSelf}
          className="w-full py-3 px-4 rounded-2xl bg-[#142B4A] hover:bg-[#1e3e68] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <MessageSquare className="w-4 h-4 text-[#14B8A6]" />
          <span>Chat with Owner</span>
        </button>

        {/* Call & Email quick row */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {owner.phone && !owner.hidePhone ? (
            <a
              href={`tel:${owner.phone}`}
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-[#14B8A6] text-[#142B4A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Call</span>
            </a>
          ) : (
            <button
              onClick={handleStartChat}
              className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>In-App Chat</span>
            </button>
          )}

          {owner.email && !owner.hideEmail ? (
            <a
              href={`mailto:${owner.email}`}
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-[#14B8A6] text-[#142B4A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Email</span>
            </a>
          ) : (
            <button
              onClick={handleInterestedClick}
              className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50"
            >
              <Send className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Send Inquiry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerContactCard;


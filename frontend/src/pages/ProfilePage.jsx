import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  EyeOff,
  Save,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProfilePage = () => {
  const { user, updateUserProfile, isAuthenticated } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [role, setRole] = useState(user?.role || 'both');
  const [hidePhone, setHidePhone] = useState(user?.hidePhone || false);
  const [hideEmail, setHideEmail] = useState(user?.hideEmail || false);
  const [saving, setSaving] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateUserProfile({
        fullName,
        phone,
        bio,
        profileImage,
        role,
        hidePhone,
        hideEmail
      });
      success('Profile and privacy settings saved successfully!');
    } catch (err) {
      error(err.customMessage || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142B4A]">
            Profile & Privacy Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your personal profile, credentials, and public contact visibility.
          </p>
        </div>

        {user?.isVerified && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-[#14B8A6] font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified User</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-card space-y-6">
          <h3 className="text-lg font-extrabold text-[#142B4A]">Personal Details</h3>

          {/* Avatar Preview & URL */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-slate-100">
            <img
              src={profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={fullName}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-[#14B8A6]/20 shadow-md"
            />
            <div className="flex-1 w-full space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Profile Photo Image URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#14B8A6]"
              />
              <p className="text-[11px] text-slate-400">Paste any image link (Unsplash, Cloudinary, etc.)</p>
            </div>
          </div>

          {/* Full Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Marketplace Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold bg-white focus:outline-none focus:border-[#14B8A6]"
              >
                <option value="buyer">Property Buyer / Tenant</option>
                <option value="owner">Property Owner / Seller</option>
                <option value="both">Both Buyer & Seller</option>
              </select>
            </div>
          </div>

          {/* Email (Readonly) & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#14B8A6]"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Short Professional Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Licensed property manager or software professional looking for residential villas..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6]"
            />
          </div>
        </div>

        {/* Privacy Controls Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-card space-y-6">
          <div className="flex items-center gap-3">
            <EyeOff className="w-5 h-5 text-[#14B8A6]" />
            <h3 className="text-lg font-extrabold text-[#142B4A]">Contact Privacy Controls</h3>
          </div>
          <p className="text-xs text-slate-500">
            Control whether prospective buyers can view your direct phone number and email on property detail pages.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-sm font-bold text-[#142B4A]">Hide Phone Number Publicly</p>
                <p className="text-xs text-slate-500">
                  When enabled, buyers will only be able to contact you via the in-app chat system.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hidePhone}
                  onChange={(e) => setHidePhone(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14B8A6]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-sm font-bold text-[#142B4A]">Hide Email Address Publicly</p>
                <p className="text-xs text-slate-500">
                  When enabled, your email address is hidden from the public property contact card.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideEmail}
                  onChange={(e) => setHideEmail(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14B8A6]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-2xl bg-[#142B4A] hover:bg-[#14B8A6] text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Profile & Privacy'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;


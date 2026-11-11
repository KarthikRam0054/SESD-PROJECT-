import React from 'react';
import { User, Phone, Mail, ShieldCheck, EyeOff } from 'lucide-react';

const Step5OwnerInfo = ({ formData, updateFormData, user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-[#142B4A]">Step 5: Owner Information & Privacy</h3>
        <p className="text-sm text-slate-500">
          Confirm your contact credentials and choose how you wish prospective buyers to reach you.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#14B8A6] shrink-0" />
        <span>
          Your account is automatically linked to this listing. You can change your public phone and email visibility at any time.
        </span>
      </div>

      {/* Owner Name */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Owner / Contact Person Name
        </label>
        <div className="relative">
          <User className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={formData.ownerName || user?.fullName || ''}
            onChange={(e) => updateFormData({ ownerName: e.target.value })}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] font-medium"
          />
        </div>
      </div>

      {/* Contact Number & Privacy Toggle */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-[#142B4A]">
          Contact Phone Number
        </label>
        <div className="relative">
          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="tel"
            value={formData.ownerPhone || user?.phone || ''}
            onChange={(e) => updateFormData({ ownerPhone: e.target.value })}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] font-medium"
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <EyeOff className="w-4 h-4 text-slate-400" />
            <span>Hide phone number publicly (inquiries will use In-App Chat)</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hidePhone || false}
              onChange={(e) => updateFormData({ hidePhone: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#14B8A6]"></div>
          </label>
        </div>
      </div>

      {/* Email & Privacy Toggle */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-[#142B4A]">
          Contact Email Address
        </label>
        <div className="relative">
          <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="email"
            value={formData.ownerEmail || user?.email || ''}
            onChange={(e) => updateFormData({ ownerEmail: e.target.value })}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] font-medium"
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <EyeOff className="w-4 h-4 text-slate-400" />
            <span>Hide email address publicly</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hideEmail || false}
              onChange={(e) => updateFormData({ hideEmail: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#14B8A6]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step5OwnerInfo;


import React from 'react';
import {
  COMMUNITY_TYPES,
  FURNISHED_STATUSES,
  PROPERTY_CONDITIONS,
  ALL_AMENITIES
} from '../../utils/constants';

const Step2Details = ({ formData, updateFormData }) => {
  const toggleAmenity = (amenity) => {
    const current = formData.amenities || [];
    if (current.includes(amenity)) {
      updateFormData({ amenities: current.filter((a) => a !== amenity) });
    } else {
      updateFormData({ amenities: [...current, amenity] });
    }
  };

  const calculatedRate =
    formData.size > 0 && formData.price > 0 && formData.sizeUnit === 'sq ft'
      ? Math.round(Number(formData.price) / Number(formData.size))
      : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-[#142B4A]">Step 2: Property Details</h3>
        <p className="text-sm text-slate-500">Specify pricing, dimensions, room count, and lifestyle amenities.</p>
      </div>

      {/* Pricing & Size Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#142B4A] mb-2">
            Total Price (₹ INR) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 15000000 (1.5 Cr)"
            value={formData.price || ''}
            onChange={(e) => updateFormData({ price: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all font-semibold"
          />
          {calculatedRate && (
            <p className="text-xs text-[#14B8A6] font-bold mt-1">
              Estimated Rate: ₹{calculatedRate.toLocaleString('en-IN')} / sq ft
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#142B4A] mb-2">
            Property Size & Unit <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              placeholder="e.g. 2400"
              value={formData.size || ''}
              onChange={(e) => updateFormData({ size: e.target.value })}
              required
              className="w-2/3 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all font-semibold"
            />
            <select
              value={formData.sizeUnit || 'sq ft'}
              onChange={(e) => updateFormData({ sizeUnit: e.target.value })}
              className="w-1/3 px-3 py-3 rounded-2xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#14B8A6] font-semibold text-slate-700"
            >
              <option value="sq ft">sq ft</option>
              <option value="acres">acres</option>
              <option value="sq yards">sq yards</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bedrooms, Bathrooms, Floors */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#142B4A] mb-1.5 uppercase tracking-wider">
            Bedrooms
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 3"
            value={formData.bedrooms}
            onChange={(e) => updateFormData({ bedrooms: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#142B4A] mb-1.5 uppercase tracking-wider">
            Bathrooms
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 3"
            value={formData.bathrooms}
            onChange={(e) => updateFormData({ bathrooms: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#142B4A] mb-1.5 uppercase tracking-wider">
            Floors
          </label>
          <input
            type="number"
            min="1"
            placeholder="e.g. 2"
            value={formData.floors}
            onChange={(e) => updateFormData({ floors: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6]"
          />
        </div>
      </div>

      {/* Community Type & Furnishing & Condition */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#142B4A] mb-1.5 uppercase tracking-wider">
            Community
          </label>
          <select
            value={formData.communityType}
            onChange={(e) => updateFormData({ communityType: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#14B8A6]"
          >
            {COMMUNITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#142B4A] mb-1.5 uppercase tracking-wider">
            Furnishing
          </label>
          <select
            value={formData.furnishedStatus}
            onChange={(e) => updateFormData({ furnishedStatus: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#14B8A6]"
          >
            {FURNISHED_STATUSES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#142B4A] mb-1.5 uppercase tracking-wider">
            Condition
          </label>
          <select
            value={formData.propertyCondition}
            onChange={(e) => updateFormData({ propertyCondition: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#14B8A6]"
          >
            {PROPERTY_CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amenities Multi-Select */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Amenities & Facilities
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-3 rounded-2xl border border-slate-200 bg-slate-50/50">
          {ALL_AMENITIES.map((amenity) => {
            const isChecked = (formData.amenities || []).includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                  isChecked
                    ? 'border-[#14B8A6] bg-white text-[#142B4A] shadow-sm'
                    : 'border-transparent bg-white/70 text-slate-600 hover:bg-white'
                }`}
              >
                <span className="truncate mr-1">{amenity}</span>
                {isChecked && <span className="text-[#14B8A6] font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step2Details;


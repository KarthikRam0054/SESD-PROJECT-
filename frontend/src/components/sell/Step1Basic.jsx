import React from 'react';
import { PROPERTY_CATEGORIES, LISTING_TYPES } from '../../utils/constants';

const Step1Basic = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-[#142B4A]">Step 1: Basic Information</h3>
        <p className="text-sm text-slate-500">Provide the primary title, purpose, and overview of your property listing.</p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Property Title <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Luxurious 4 BHK Gated Villa with Private Pool in Jubilee Hills"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          required
          maxLength={180}
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
        />
        <p className="text-xs text-slate-400 mt-1 text-right">{formData.title.length}/180</p>
      </div>

      {/* Purpose: Sale vs Rent */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Listing Purpose <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {LISTING_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateFormData({ listingType: type.value })}
              className={`py-3.5 px-4 rounded-2xl font-bold text-sm border-2 transition-all ${
                formData.listingType === type.value
                  ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-[#142B4A]'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Property Category <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROPERTY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateFormData({ category: cat })}
              className={`py-3 px-4 rounded-2xl text-left text-sm font-semibold border-2 transition-all flex items-center justify-between ${
                formData.category === cat
                  ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-[#142B4A]'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span>{cat}</span>
              {formData.category === cat && <span className="text-[#14B8A6] font-bold">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Detailed Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={5}
          placeholder="Describe architectural highlights, interior finishes, sunlight orientation, nearby schools or IT parks, and unique features..."
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          required
          maxLength={4000}
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all leading-relaxed"
        />
        <p className="text-xs text-slate-400 mt-1 text-right">{formData.description.length}/4000</p>
      </div>
    </div>
  );
};

export default Step1Basic;


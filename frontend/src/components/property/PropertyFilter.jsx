import React, { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Building,
  MapPin,
  ChevronDown
} from 'lucide-react';
import {
  PROPERTY_CATEGORIES,
  POPULAR_CITIES,
  PROPERTY_CONDITIONS,
  COMMUNITY_TYPES,
  FURNISHED_STATUSES
} from '../../utils/constants';

const PropertyFilter = ({ filters, onFilterChange, onReset }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value, page: 1 });
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => {
    if (k === 'page' || k === 'limit' || k === 'sort') return false;
    return v !== '' && v !== undefined && v !== null;
  }).length;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card">
      {/* Filter Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#14B8A6]" />
          <h3 className="font-extrabold text-[#142B4A] text-lg">Filter Properties</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#14B8A6] text-white text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Filter Controls Grid / Form */}
      <div className="pt-5 space-y-5">
        {/* Search Keyword */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Keywords
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="e.g. Jubilee Hills, Pool, Luxury..."
              value={filters.search || ''}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all"
            />
          </div>
        </div>

        {/* Listing Type (Buy vs Rent) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Purpose
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleChange('listingType', filters.listingType === 'sale' ? '' : 'sale')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                filters.listingType === 'sale'
                  ? 'bg-[#142B4A] text-white border-[#142B4A]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Buy / Sale
            </button>
            <button
              type="button"
              onClick={() => handleChange('listingType', filters.listingType === 'rent' ? '' : 'rent')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                filters.listingType === 'rent'
                  ? 'bg-[#142B4A] text-white border-[#142B4A]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              For Rent
            </button>
          </div>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            City
          </label>
          <select
            value={filters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#14B8A6] transition-all font-medium text-slate-800"
          >
            <option value="">All Cities (Telangana)</option>
            {POPULAR_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Property Category */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#14B8A6] transition-all font-medium text-slate-800"
          >
            <option value="">All Categories</option>
            {PROPERTY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Price Range (₹)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#14B8A6]"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#14B8A6]"
            />
          </div>
        </div>

        {/* Bedrooms Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Bedrooms
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {['1', '2', '3', '4', '5+'].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => handleChange('bedrooms', filters.bedrooms === b ? '' : b)}
                className={`flex-1 min-w-[40px] py-2 text-xs font-bold rounded-xl border transition-all ${
                  filters.bedrooms === b
                    ? 'bg-[#14B8A6] text-white border-[#14B8A6]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Community Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Community Classification
          </label>
          <select
            value={filters.communityType || ''}
            onChange={(e) => handleChange('communityType', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#14B8A6]"
          >
            <option value="">Any (Gated & Individual)</option>
            {COMMUNITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Furnished Status */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Furnishing
          </label>
          <select
            value={filters.furnishedStatus || ''}
            onChange={(e) => handleChange('furnishedStatus', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#14B8A6]"
          >
            <option value="">Any Furnishing</option>
            {FURNISHED_STATUSES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Property Condition */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Condition
          </label>
          <select
            value={filters.propertyCondition || ''}
            onChange={(e) => handleChange('propertyCondition', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#14B8A6]"
          >
            <option value="">New / Resale / Construction</option>
            {PROPERTY_CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>

        {/* Parking Toggle */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Parking Required</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.parking === 'true' || filters.parking === true}
              onChange={(e) => handleChange('parking', e.target.checked ? 'true' : '')}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14B8A6]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;


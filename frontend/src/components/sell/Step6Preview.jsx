import React from 'react';
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Tag,
  Shield,
  Layers
} from 'lucide-react';
import { formatPrice, formatSize } from '../../utils/formatters';

const Step6Preview = ({ formData, isSubmitting }) => {
  const coverImg =
    formData.coverImage ||
    (formData.images && formData.images[0]) ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-[#142B4A]">Step 6: Review & Publish</h3>
        <p className="text-sm text-slate-500">
          Review your property details before publishing live to the REALTOR marketplace.
        </p>
      </div>

      {/* Live Preview Card */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
        <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100">
          <div className="relative aspect-[16/10]">
            <img src={coverImg} alt="Cover preview" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#142B4A]/90 text-white">
                {formData.listingType === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#14B8A6] text-white">
                {formData.category}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 bg-[#142B4A]/90 backdrop-blur-md px-3 py-1 rounded-xl text-white text-base font-black">
              {formatPrice(formData.price, formData.listingType)}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center gap-1 text-xs font-bold text-[#14B8A6]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{formData.location?.area}, {formData.location?.city}</span>
            </div>
            <h4 className="font-bold text-[#142B4A] text-sm line-clamp-1">{formData.title || 'Untitled Property'}</h4>

            <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-slate-50 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-slate-400" /> {formData.bedrooms || 0} Beds</div>
              <div className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-slate-400" /> {formData.bathrooms || 0} Baths</div>
              <div className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-slate-400" /> {formatSize(formData.size, formData.sizeUnit)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Summary List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm mb-2">Listing Overview</h4>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Classification:</span>
            <span className="font-bold text-[#142B4A]">{formData.communityType}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Condition:</span>
            <span className="font-bold text-[#142B4A]">{formData.propertyCondition}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Furnishing:</span>
            <span className="font-bold text-[#142B4A]">{formData.furnishedStatus}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Floors:</span>
            <span className="font-bold text-[#142B4A]">{formData.floors}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm mb-2">Location & Media</h4>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">State / City:</span>
            <span className="font-bold text-[#142B4A]">{formData.location.state}, {formData.location.city}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Locality:</span>
            <span className="font-bold text-[#142B4A]">{formData.location.area}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Photos Uploaded:</span>
            <span className="font-bold text-[#14B8A6]">{formData.images?.length || 0} Images</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Amenities:</span>
            <span className="font-bold text-[#142B4A]">{formData.amenities?.length || 0} Selected</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>Ready to launch! Clicking "Publish Property" will store the listing in MongoDB and make it immediately discoverable by prospective buyers.</span>
      </div>
    </div>
  );
};

export default Step6Preview;


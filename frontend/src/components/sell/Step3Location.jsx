import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { POPULAR_CITIES } from '../../utils/constants';

const CITY_COORDINATES = {
  Hyderabad: { lat: 17.3850, lng: 78.4867 },
  Warangal: { lat: 17.9784, lng: 79.5101 },
  Hanamkonda: { lat: 18.0125, lng: 79.5542 },
  Karimnagar: { lat: 18.4386, lng: 79.1288 }
};

const Step3Location = ({ formData, updateFormData }) => {
  const handleCityChange = (city) => {
    const coords = CITY_COORDINATES[city] || { lat: 17.3850, lng: 78.4867 };
    updateFormData({
      location: {
        ...formData.location,
        city,
        coordinates: coords
      }
    });
  };

  const handleLocationField = (field, val) => {
    updateFormData({
      location: {
        ...formData.location,
        [field]: val
      }
    });
  };

  const handleCoordinateField = (coordKey, val) => {
    updateFormData({
      location: {
        ...formData.location,
        coordinates: {
          ...formData.location.coordinates,
          [coordKey]: parseFloat(val) || 0
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-[#142B4A]">Step 3: Location & Address</h3>
        <p className="text-sm text-slate-500">Provide geographical details so interested buyers can pinpoint your property.</p>
      </div>

      {/* State & City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#142B4A] mb-2">
            State <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.location.state || 'Telangana'}
            onChange={(e) => handleLocationField('state', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm bg-slate-50 font-medium text-slate-700"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#142B4A] mb-2">
            City <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.location.city || ''}
            onChange={(e) => handleCityChange(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#14B8A6] font-semibold text-slate-800"
          >
            <option value="">Select City</option>
            {POPULAR_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Area / Locality */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Area / Locality <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="e.g. Jubilee Hills, Banjara Hills, Kazipet, Subedari..."
            value={formData.location.area || ''}
            onChange={(e) => handleLocationField('area', e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] font-medium"
          />
        </div>
      </div>

      {/* Complete Address */}
      <div>
        <label className="block text-sm font-bold text-[#142B4A] mb-2">
          Complete Physical Address <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="House/Plot No., Street Name, Landmark, Near Metro/College, Pincode..."
          value={formData.location.address || ''}
          onChange={(e) => handleLocationField('address', e.target.value)}
          required
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#14B8A6] font-medium leading-relaxed"
        />
      </div>

      {/* Coordinates / Map Pin Location */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
          <Navigation className="w-4 h-4 text-[#14B8A6]" />
          <span>Interactive Map Positioning (Coordinates)</span>
        </div>
        <p className="text-xs text-slate-500">
          Automatically calibrated to your selected city. You can fine-tune latitude and longitude if desired.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={formData.location.coordinates?.lat || 17.3850}
              onChange={(e) => handleCoordinateField('lat', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={formData.location.coordinates?.lng || 78.4867}
              onChange={(e) => handleCoordinateField('lng', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Location;


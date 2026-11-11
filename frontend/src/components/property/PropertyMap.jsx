import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const PropertyMap = ({ coordinates, address, city, area, title }) => {
  const lat = coordinates?.lat || 17.3850;
  const lng = coordinates?.lng || 78.4867;

  // OpenStreetMap embed URL with marker
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015}%2C${lat - 0.015}%2C${lng + 0.015}%2C${lat + 0.015}&layer=mapnik&marker=${lat}%2C${lng}`;
  const externalGoogleUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-[#142B4A] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#14B8A6]" />
            <span>Property Location</span>
          </h3>
          <p className="text-sm text-slate-500">
            {address || `${area}, ${city}, Telangana`}
          </p>
        </div>

        <a
          href={externalGoogleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#14B8A6] hover:text-white text-xs font-bold text-[#142B4A] transition-all self-start sm:self-auto"
        >
          <span>Open Full Map</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Map Embed Container */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
        <iframe
          title="Property Location Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={osmUrl}
          className="w-full h-full filter saturate-150"
        />

        {/* Floating Location Card Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#142B4A] flex items-center justify-center text-[#14B8A6] shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#142B4A] truncate">{area}, {city}</p>
            <p className="text-[11px] text-slate-500">Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;


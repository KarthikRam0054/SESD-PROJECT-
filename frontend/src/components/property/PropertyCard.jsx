import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Maximize2, Shield, Sparkles } from 'lucide-react';
import { formatPrice, formatSize } from '../../utils/formatters';
import { favoriteService } from '../../services/favoriteService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const PropertyCard = ({ property, onFavoriteChange }) => {
  const { user, isAuthenticated } = useAuth();
  const { success, error, info } = useToast();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(property.isFavorite || false);
  const [favLoading, setFavLoading] = useState(false);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      info('Please sign in to save your favorite properties.');
      navigate('/login');
      return;
    }

    try {
      setFavLoading(true);
      if (isFav) {
        await favoriteService.removeFavorite(property._id);
        setIsFav(false);
        success('Removed from favorites');
        if (onFavoriteChange) onFavoriteChange(property._id, false);
      } else {
        await favoriteService.addFavorite(property._id);
        setIsFav(true);
        success('Added to favorites!');
        if (onFavoriteChange) onFavoriteChange(property._id, true);
      }
    } catch (err) {
      error(err.customMessage || 'Failed to update favorite status');
    } finally {
      setFavLoading(false);
    }
  };

  const coverImg =
    property.coverImage ||
    (property.images && property.images[0]) ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  const isSoldOrRented = property.status !== 'Available';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover flex flex-col h-full transition-all duration-300"
    >
      {/* Property Thumbnail & Overlays */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Link to={`/properties/${property._id}`}>
          <img
            src={coverImg}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              isSoldOrRented ? 'grayscale-[40%]' : ''
            }`}
            loading="lazy"
          />
        </Link>

        {/* Status & Type Pills */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#142B4A]/90 backdrop-blur-md text-white shadow-sm">
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#14B8A6] text-white shadow-sm">
            {property.category}
          </span>
          {property.status === 'Sold' && (
            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-sm uppercase">
              Sold
            </span>
          )}
          {property.status === 'Rented' && (
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-600 text-white shadow-sm uppercase">
              Rented
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleToggleFavorite}
          disabled={favLoading}
          aria-label="Save to favorites"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white shadow-md transition-all active:scale-90"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Price Tag Overlay at Bottom of Image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
          <div className="bg-[#142B4A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-white shadow-lg">
            <span className="text-lg font-black tracking-tight text-white">
              {formatPrice(property.price, property.listingType)}
            </span>
            {property.pricePerSqFt && property.listingType === 'sale' && (
              <span className="text-[11px] text-slate-300 font-medium ml-1.5">
                (₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft)
              </span>
            )}
          </div>

          {property.communityType === 'Gated Community' && (
            <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#142B4A] flex items-center gap-1 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Gated</span>
            </div>
          )}
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1 text-xs font-semibold text-[#14B8A6] mb-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {property.location?.area}, {property.location?.city}
            </span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property._id}`}>
            <h3 className="font-bold text-[#142B4A] text-base leading-snug line-clamp-2 hover:text-[#14B8A6] transition-colors mb-3">
              {property.title}
            </h3>
          </Link>

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-[#F5F7FA] text-xs font-semibold text-slate-700">
            {property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-slate-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-400" />
                <span>Plot/Open</span>
              </div>
            )}

            {property.bathrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Clear Title</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span className="truncate">{formatSize(property.size, property.sizeUnit)}</span>
            </div>
          </div>
        </div>

        {/* Footer with Owner snippet and View Details */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={
                property.owner?.profileImage ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
              }
              alt={property.owner?.fullName || 'Owner'}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-xs font-medium text-slate-600 truncate max-w-[110px]">
              {property.owner?.fullName || 'Property Owner'}
            </span>
          </div>

          <Link
            to={`/properties/${property._id}`}
            className="text-xs font-bold text-[#142B4A] hover:text-[#14B8A6] flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
          >
            <span>View Details</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;


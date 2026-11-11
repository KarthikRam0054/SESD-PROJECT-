import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building,
  Shield,
  Layers,
  Heart,
  Share2,
  Calendar,
  CheckCircle2,
  Eye,
  Check,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyMap from '../components/property/PropertyMap';
import OwnerContactCard from '../components/property/OwnerContactCard';
import { PropertyDetailSkeleton } from '../components/common/LoadingSkeleton';
import { propertyService } from '../services/propertyService';
import { favoriteService } from '../services/favoriteService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, formatSize, formatDate } from '../utils/formatters';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { success, error, info } = useToast();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getPropertyById(id);
        if (isMounted) {
          setProperty(data.property);
          setIsFavorite(data.property?.isFavorite || false);
        }
      } catch (err) {
        error('Property not found or unavailable');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProperty();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      info('Please sign in to save this property');
      navigate('/login');
      return;
    }

    try {
      setFavoriteLoading(true);
      if (isFavorite) {
        await favoriteService.removeFavorite(id);
        setIsFavorite(false);
        success('Removed from favorites');
      } else {
        await favoriteService.addFavorite(id);
        setIsFavorite(true);
        success('Added to favorites!');
      }
    } catch (err) {
      error('Failed to update favorite');
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Property link copied to clipboard!');
  };

  if (loading) {
    return <PropertyDetailSkeleton />;
  }

  if (!property) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-[#142B4A] mb-2">Property Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">
          The property listing you requested may have been removed or is no longer available.
        </p>
        <Link
          to="/buy"
          className="px-6 py-3 rounded-xl bg-[#142B4A] text-white text-sm font-bold hover:bg-[#14B8A6] transition-colors"
        >
          Browse All Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#142B4A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to listings</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleFavorite}
            disabled={favoriteLoading}
            className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold ${
              isFavorite
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:border-rose-200 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFavorite ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-2xl border border-slate-200 bg-white hover:border-[#14B8A6] text-slate-700 hover:text-[#14B8A6] transition-all flex items-center gap-2 text-xs font-bold"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Header / Title & Price */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          {/* Status & Category Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#142B4A] text-white">
              {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#14B8A6] text-white">
              {property.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                property.status === 'Available'
                  ? 'bg-emerald-100 text-emerald-800'
                  : property.status === 'Sold'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              ● {property.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#142B4A] leading-tight">
            {property.title}
          </h1>

          <p className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#14B8A6] shrink-0" />
            <span>{property.location?.address}, {property.location?.area}, {property.location?.city}, {property.location?.state}</span>
          </p>
        </div>

        {/* Price Card snippet */}
        <div className="bg-[#F5F7FA] p-5 rounded-2xl border border-slate-200/80 shrink-0 text-left md:text-right w-full md:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Price
          </span>
          <span className="text-3xl font-black text-[#142B4A]">
            {formatPrice(property.price, property.listingType)}
          </span>
          {property.pricePerSqFt && property.listingType === 'sale' && (
            <span className="block text-xs font-bold text-[#14B8A6] mt-1">
              ₹{property.pricePerSqFt.toLocaleString('en-IN')} / sq ft
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Gallery & Specs (Left) vs Owner Contact Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <PropertyGallery images={property.images} title={property.title} />

          {/* Quick Specifications Highlights */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card">
            <h3 className="text-lg font-extrabold text-[#142B4A] mb-5">
              Property Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-slate-100">
                <Maximize2 className="w-5 h-5 text-[#14B8A6] mb-2" />
                <span className="block text-xs text-slate-400 font-semibold uppercase">Size</span>
                <span className="font-bold text-[#142B4A] text-sm">{formatSize(property.size, property.sizeUnit)}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-slate-100">
                <Bed className="w-5 h-5 text-[#14B8A6] mb-2" />
                <span className="block text-xs text-slate-400 font-semibold uppercase">Bedrooms</span>
                <span className="font-bold text-[#142B4A] text-sm">{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Open / Plot'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-slate-100">
                <Bath className="w-5 h-5 text-[#14B8A6] mb-2" />
                <span className="block text-xs text-slate-400 font-semibold uppercase">Bathrooms</span>
                <span className="font-bold text-[#142B4A] text-sm">{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-slate-100">
                <Layers className="w-5 h-5 text-[#14B8A6] mb-2" />
                <span className="block text-xs text-slate-400 font-semibold uppercase">Floors</span>
                <span className="font-bold text-[#142B4A] text-sm">{property.floors || 1} Floor(s)</span>
              </div>
            </div>

            {/* Additional Spec Attributes Table */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Community Type:</span>
                <span className="font-bold text-[#142B4A]">{property.communityType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Furnishing Status:</span>
                <span className="font-bold text-[#142B4A]">{property.furnishedStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Property Condition:</span>
                <span className="font-bold text-[#142B4A]">{property.propertyCondition}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Parking Space:</span>
                <span className="font-bold text-[#142B4A]">{property.parking ? 'Available (Covered)' : 'No Dedicated Parking'}</span>
              </div>
            </div>
          </div>

          {/* Full Property Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-4">
            <h3 className="text-lg font-extrabold text-[#142B4A]">
              About This Property
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
              {property.description}
            </p>
          </div>

          {/* Amenities & Facilities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-5">
              <h3 className="text-lg font-extrabold text-[#142B4A]">
                Amenities & Facilities
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Map */}
          <PropertyMap
            coordinates={property.location?.coordinates}
            address={property.location?.address}
            city={property.location?.city}
            area={property.location?.area}
            title={property.title}
          />
        </div>

        {/* Right Column (1 Col) Sticky Contact & Inquiries */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
          <OwnerContactCard
            owner={property.owner}
            propertyId={property._id}
            propertyTitle={property.title}
          />

          {/* Listing Meta Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-xs text-slate-500 space-y-2">
            <div className="flex items-center justify-between">
              <span>Listing ID:</span>
              <span className="font-mono font-bold text-slate-700">{property._id?.slice(-8)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Published:</span>
              <span className="font-semibold text-slate-700">{formatDate(property.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Views:</span>
              <span className="font-semibold text-slate-700">{property.views || 1} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;

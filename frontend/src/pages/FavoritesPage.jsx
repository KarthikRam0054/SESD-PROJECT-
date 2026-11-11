import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Building2, Trash2 } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import { favoriteService } from '../services/favoriteService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const FavoritesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoriteService.getFavorites();
      setFavorites(data.favorites || []);
    } catch (err) {
      error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [isAuthenticated]);

  const handleFavoriteRemoved = (propertyId) => {
    setFavorites((prev) => prev.filter((f) => f.property?._id !== propertyId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142B4A] flex items-center gap-3">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>Saved Favorites</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Properties you have bookmarked for easy reference and owner follow-up.
          </p>
        </div>

        <span className="px-4 py-2 rounded-2xl bg-rose-50 text-rose-600 font-extrabold text-xs">
          {favorites.length} Saved
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
          <PropertyCardSkeleton />
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <PropertyCard
              key={fav._id}
              property={{ ...fav.property, isFavorite: true }}
              onFavoriteChange={(propId, isFav) => {
                if (!isFav) handleFavoriteRemoved(propId);
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="No Saved Properties"
          description="You haven’t saved any properties yet. Click the heart icon on any property card to bookmark it here."
          actionText="Browse Available Properties"
          actionLink="/buy"
        />
      )}
    </div>
  );
};

export default FavoritesPage;


import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Building2,
  ChevronLeft,
  ChevronRight,
  FilterX
} from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import PropertyFilter from '../components/property/PropertyFilter';
import { PropertyCardSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import { propertyService } from '../services/propertyService';

const BuyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract initial filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    listingType: searchParams.get('listingType') || '',
    city: searchParams.get('city') || '',
    area: searchParams.get('area') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    communityType: searchParams.get('communityType') || '',
    furnishedStatus: searchParams.get('furnishedStatus') || '',
    propertyCondition: searchParams.get('propertyCondition') || '',
    parking: searchParams.get('parking') || '',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page') || '1', 10)
  });

  const [properties, setProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state to URL search parameters
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        params.set(key, value);
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Fetch properties from backend API dynamically
  useEffect(() => {
    let isMounted = true;
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getProperties(filters);
        if (isMounted) {
          setProperties(data.properties || []);
          setTotalCount(data.total || 0);
          setTotalPages(data.pages || 1);
        }
      } catch (err) {
        console.error('Failed to query properties:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProperties();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      listingType: '',
      city: '',
      area: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      communityType: '',
      furnishedStatus: '',
      propertyCondition: '',
      parking: '',
      sort: 'newest',
      page: 1
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142B4A]">
            Explore Available Properties
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse verified listings for sale and rent across Telangana.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-[#142B4A]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#14B8A6]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex-1 sm:flex-initial">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={filters.sort || 'newest'}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
              className="bg-transparent text-xs font-bold text-[#142B4A] focus:outline-none"
            >
              <option value="newest">Sort: Newest Listings</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="size_desc">Largest Properties</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <PropertyFilter
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Drawer Overlay */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex justify-end">
            <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-4 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-bold text-lg text-[#142B4A]">Filter Listings</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-slate-500 font-bold"
                >
                  ✕
                </button>
              </div>
              <PropertyFilter
                filters={filters}
                onFilterChange={(f) => {
                  setFilters(f);
                  setMobileFilterOpen(false);
                }}
                onReset={() => {
                  handleResetFilters();
                  setMobileFilterOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Properties Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>
              Showing <span className="text-[#142B4A] font-bold">{properties.length}</span> of{' '}
              <span className="text-[#142B4A] font-bold">{totalCount}</span> properties
            </span>

            {filters.city && (
              <span className="px-2.5 py-1 rounded-full bg-teal-50 text-[#14B8A6] font-bold">
                City: {filters.city}
              </span>
            )}
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Matching Properties"
              description="We couldn't find any listings matching your selected filters. Try widening your price range, choosing another city, or resetting all filters."
              actionText="Reset Filters"
              onActionClick={handleResetFilters}
            />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 pb-4">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page <= 1}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#14B8A6] transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      filters.page === pageNum
                        ? 'bg-[#142B4A] text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= totalPages}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#14B8A6] transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyPage;


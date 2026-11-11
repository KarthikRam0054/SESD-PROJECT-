import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Building2,
  Home as HomeIcon,
  Layers,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/LoadingSkeleton';
import { propertyService } from '../services/propertyService';
import { POPULAR_CITIES, PROPERTY_CATEGORIES } from '../utils/constants';
import { formatPrice } from '../utils/formatters';

const HomePage = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hero search form state
  const [searchPurpose, setSearchPurpose] = useState('sale');
  const [searchCity, setSearchCity] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getHomeShowcase();
        setFeatured(data.featured || []);
        setRecent(data.recent || []);
        setLocations(data.locations || []);
      } catch (err) {
        console.error('Failed to load homepage showcase:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchPurpose) params.append('listingType', searchPurpose);
    if (searchCity) params.append('city', searchCity);
    if (searchCategory) params.append('category', searchCategory);
    if (searchKeyword.trim()) params.append('search', searchKeyword.trim());
    navigate(`/buy?${params.toString()}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[620px] flex items-center justify-center overflow-hidden bg-[#142B4A]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Architecture"
            className="w-full h-full object-cover scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#142B4A]/95 via-[#142B4A]/80 to-[#142B4A]/70 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#14B8A6] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Your Place. Build Your Future.</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl leading-[1.15]"
          >
            Discover Properties That Feel Like{' '}
            <span className="text-[#14B8A6] underline decoration-[#14B8A6]/40 underline-offset-8">
              Home
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed"
          >
            Directly connect with owners and verified sellers across Hyderabad, Warangal, Hanamkonda, and Karimnagar with zero hidden middleman fees.
          </motion.p>

          {/* Prominent Search Bar Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-4xl mt-10 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/40"
          >
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              {/* Buy vs Rent Toggle Switch */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => setSearchPurpose('sale')}
                  className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                    searchPurpose === 'sale'
                      ? 'bg-[#142B4A] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#142B4A]'
                  }`}
                >
                  Buy Properties
                </button>
                <button
                  type="button"
                  onClick={() => setSearchPurpose('rent')}
                  className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                    searchPurpose === 'rent'
                      ? 'bg-[#142B4A] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#142B4A]'
                  }`}
                >
                  Rent Properties
                </button>
              </div>

              {/* Input Fields Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Location Input */}
                <div className="sm:col-span-4 relative text-left">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Location / City
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <MapPin className="w-4 h-4 text-[#14B8A6] shrink-0" />
                    <select
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#142B4A] focus:outline-none"
                    >
                      <option value="">All Telangana Cities</option>
                      {POPULAR_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category Dropdown */}
                <div className="sm:col-span-4 relative text-left">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <Building2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
                    <select
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#142B4A] focus:outline-none"
                    >
                      <option value="">All Categories</option>
                      {PROPERTY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Keyword Search */}
                <div className="sm:col-span-4 relative text-left">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Keywords
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Pool, Gated, Garden..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#142B4A] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Search Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#14B8A6] hover:bg-[#0d9488] text-white font-extrabold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. PROPERTY CATEGORIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#14B8A6] mb-2">Explore By Category</p>
          <h2 className="text-3xl font-black text-[#142B4A]">Tailored To Your Lifestyle</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Individual Houses',
              desc: 'Independent residential homes with private land & terraces.',
              img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
              link: '/buy?category=Individual+Houses'
            },
            {
              title: 'Buildings & Rentals',
              desc: 'Multi-unit investment apartments with steady rental yields.',
              img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
              link: '/buy?category=Buildings+with+Rental+Units'
            },
            {
              title: 'Luxury Villas',
              desc: 'Gated community duplexes with private pools and clubhouses.',
              img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
              link: '/buy?category=Villas'
            },
            {
              title: 'Land & Plots',
              desc: 'Clear title open plots ready for construction or appreciation.',
              img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
              link: '/buy?category=Land+%2F+Plots'
            }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover aspect-[4/5] flex flex-col justify-end p-6 border border-slate-100 transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142B4A] via-[#142B4A]/40 to-transparent" />

              <div className="relative z-10 text-white space-y-1.5">
                <h3 className="text-xl font-black text-white group-hover:text-[#14B8A6] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#14B8A6] group-hover:translate-x-1 transition-transform">
                  <span>Explore category</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14B8A6] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked Selections</span>
            </div>
            <h2 className="text-3xl font-black text-[#142B4A]">Featured Properties</h2>
          </div>

          <Link
            to="/buy"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#142B4A] hover:text-[#14B8A6] transition-colors group"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.slice(0, 6).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 bg-white rounded-3xl border">
            No featured properties available at the moment.
          </div>
        )}
      </section>

      {/* 4. POPULAR LOCATIONS SHOWCASE */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#14B8A6] mb-2">Prime Destinations</p>
            <h2 className="text-3xl font-black text-[#142B4A]">Popular Locations in Telangana</h2>
            <p className="text-slate-500 text-sm mt-2">
              Explore dynamic real estate hubs with fast infrastructural growth and connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: 'Hyderabad',
                tag: 'IT Capital & Metro Hub',
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                count: '8+ Properties'
              },
              {
                city: 'Warangal',
                tag: 'Heritage & Rail Hub',
                img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
                count: '4+ Properties'
              },
              {
                city: 'Hanamkonda',
                tag: 'Educational & Commercial',
                img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
                count: '3+ Properties'
              },
              {
                city: 'Karimnagar',
                tag: 'Agricultural & Granite Hub',
                img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
                count: '3+ Properties'
              }
            ].map((loc, idx) => (
              <Link
                key={idx}
                to={`/buy?city=${loc.city}`}
                className="group bg-[#F5F7FA] rounded-3xl p-5 border border-slate-200/80 hover:border-[#14B8A6] hover:bg-white hover:shadow-card-hover transition-all duration-300"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-200">
                  <img
                    src={loc.img}
                    alt={loc.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#142B4A] text-lg group-hover:text-[#14B8A6] transition-colors">
                      {loc.city}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{loc.tag}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-[#142B4A] font-bold text-xs shadow-sm border border-slate-200">
                    {loc.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RECENTLY ADDED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14B8A6] mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Fresh Opportunities</span>
            </div>
            <h2 className="text-3xl font-black text-[#142B4A]">Recently Added Properties</h2>
          </div>

          <Link
            to="/buy?sort=newest"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#142B4A] hover:text-[#14B8A6] transition-colors group"
          >
            <span>See Newest Listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
        ) : recent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recent.slice(0, 6).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 bg-white rounded-3xl border">
            No properties found.
          </div>
        )}
      </section>

      {/* 6. WHY CHOOSE REALTOR (PERKS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#142B4A] rounded-3xl text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#14B8A6] mb-3">Why REALTOR?</p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6">
              A Transparent Marketplace Built for Buyers, Sellers & Investors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-slate-200">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-[#14B8A6] shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base">Direct Owner Contact</h4>
                  <p className="text-xs text-slate-300 mt-1">Zero brokerage fees. Talk directly with property owners and certified developers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-6 h-6 text-[#14B8A6] shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base">Integrated Real-Time Chat</h4>
                  <p className="text-xs text-slate-300 mt-1">Send 1-click "I'm Interested" inquiries and chat instantly using Socket.IO.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-[#14B8A6] shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base">Verified Listings</h4>
                  <p className="text-xs text-slate-300 mt-1">All listings include complete specifications, dimensions, amenities, and location pins.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-[#14B8A6] shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base">Effortless Publishing</h4>
                  <p className="text-xs text-slate-300 mt-1">6-step guided property listing flow to publish your property in under 3 minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION FOR SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-500 to-[#14B8A6] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Want to Sell or Rent Your Property?</h3>
            <p className="text-teal-50 text-sm max-w-xl">
              List your property on REALTOR for free. Reach thousands of verified buyers and receive instant inquiries.
            </p>
          </div>

          <Link
            to="/sell"
            className="px-8 py-4 rounded-2xl bg-[#142B4A] hover:bg-[#1e3e68] text-white font-black text-sm shadow-lg hover:shadow-xl transition-all shrink-0"
          >
            Post Property Ad Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


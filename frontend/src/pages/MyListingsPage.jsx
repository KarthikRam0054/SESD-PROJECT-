import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  PlusCircle,
  Eye,
  MessageSquare,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, formatDate } from '../utils/formatters';
import EmptyState from '../components/common/EmptyState';

const MyListingsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { success, error, info } = useToast();
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit price modal state
  const [editingProperty, setEditingProperty] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getMyListings();
      setListings(data.properties || []);
    } catch (err) {
      error('Failed to load your property listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchMyListings();
  }, [isAuthenticated]);

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      await propertyService.updatePropertyStatus(propertyId, newStatus);
      success(`Listing updated to: ${newStatus}`);
      setListings((prev) =>
        prev.map((item) => (item._id === propertyId ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      error(err.customMessage || 'Failed to update status');
    }
  };

  const handleDeleteListing = async (propertyId) => {
    if (!window.confirm('Are you sure you want to permanently delete this listing?')) return;

    try {
      await propertyService.deleteProperty(propertyId);
      success('Listing deleted successfully');
      setListings((prev) => prev.filter((item) => item._id !== propertyId));
    } catch (err) {
      error(err.customMessage || 'Failed to delete listing');
    }
  };

  const handleUpdatePrice = async (e) => {
    e.preventDefault();
    if (!editingProperty || !newPrice || Number(newPrice) <= 0) return;

    try {
      await propertyService.updateProperty(editingProperty._id, { price: Number(newPrice) });
      success('Price updated successfully!');
      setListings((prev) =>
        prev.map((item) =>
          item._id === editingProperty._id ? { ...item, price: Number(newPrice) } : item
        )
      );
      setEditingProperty(null);
      setNewPrice('');
    } catch (err) {
      error(err.customMessage || 'Failed to update price');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142B4A]">
            My Property Listings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your published properties, adjust prices, toggle availability, and track inquiries.
          </p>
        </div>

        <Link
          to="/sell"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#14B8A6] hover:bg-[#0d9488] text-white font-extrabold text-sm shadow-md transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Listings</p>
          <p className="text-3xl font-black text-[#142B4A] mt-2">{listings.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inquiries Received</p>
          <p className="text-3xl font-black text-[#14B8A6] mt-2">
            {listings.reduce((sum, item) => sum + (item.inquiriesCount || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Page Views</p>
          <p className="text-3xl font-black text-indigo-600 mt-2">
            {listings.reduce((sum, item) => sum + (item.views || 0), 0)}
          </p>
        </div>
      </div>

      {/* Listings Table / Cards */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm bg-white rounded-3xl border">
          Loading your listings...
        </div>
      ) : listings.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-[#F5F7FA] text-xs font-bold uppercase text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">Property</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Performance</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listings.map((prop) => (
                  <tr key={prop._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Property Thumbnail & Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.coverImage || (prop.images && prop.images[0]) || ''}
                          alt={prop.title}
                          className="w-16 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/properties/${prop._id}`}
                            className="font-bold text-[#142B4A] hover:text-[#14B8A6] text-sm line-clamp-1"
                          >
                            {prop.title}
                          </Link>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {prop.location?.area}, {prop.location?.city} • {prop.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-extrabold text-[#142B4A] block">
                        {formatPrice(prop.price, prop.listingType)}
                      </span>
                      <button
                        onClick={() => {
                          setEditingProperty(prop);
                          setNewPrice(prop.price);
                        }}
                        className="text-[11px] font-bold text-[#14B8A6] hover:underline"
                      >
                        Edit Price
                      </button>
                    </td>

                    {/* Stats */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1" title="Views">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          {prop.views || 0}
                        </span>
                        <Link
                          to="/messages"
                          className="flex items-center gap-1 text-[#14B8A6] hover:underline"
                          title="Inquiries"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          {prop.inquiriesCount || 0}
                        </Link>
                      </div>
                    </td>

                    {/* Status Toggle Dropdown */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={prop.status}
                        onChange={(e) => handleStatusChange(prop._id, e.target.value)}
                        className={`text-xs font-bold rounded-xl px-2.5 py-1.5 border focus:outline-none ${
                          prop.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : prop.status === 'Sold'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Rented">Rented</option>
                      </select>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/properties/${prop._id}`}
                          className="p-2 rounded-xl text-slate-500 hover:text-[#142B4A] hover:bg-slate-100 transition-colors"
                          title="View Live Listing"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteListing(prop._id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Published Properties Yet"
          description="You haven’t listed any properties yet. Post your first property ad to connect directly with interested buyers."
          actionText="List a Property Now"
          actionLink="/sell"
        />
      )}

      {/* Edit Price Modal */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#142B4A]">Update Listing Price</h3>
            <p className="text-xs text-slate-500">{editingProperty.title}</p>
            <form onSubmit={handleUpdatePrice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#14B8A6]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#14B8A6] text-white text-xs font-bold hover:bg-[#0d9488]"
                >
                  Save Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;


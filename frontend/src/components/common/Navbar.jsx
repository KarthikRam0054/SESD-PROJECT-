import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import {
  Home,
  Building2,
  PlusCircle,
  MessageSquare,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useSocket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
      isActive
        ? 'text-[#14B8A6] bg-[#14B8A6]/10'
        : 'text-[#142B4A]/80 hover:text-[#142B4A] hover:bg-slate-100/80'
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
      isActive
        ? 'text-[#14B8A6] bg-[#14B8A6]/10'
        : 'text-[#142B4A] hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#142B4A] flex items-center justify-center text-[#14B8A6] shadow-md group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#142B4A]">
                REALTOR<span className="text-[#14B8A6]">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] hidden sm:block">
                Find Your Place. Build Your Future.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClasses}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/buy" className={navLinkClasses}>
              <Building2 className="w-4 h-4" />
              <span>Buy</span>
            </NavLink>
            <NavLink to="/sell" className={navLinkClasses}>
              <PlusCircle className="w-4 h-4" />
              <span>Sell</span>
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/my-listings" className={navLinkClasses}>
                  <span>My Listings</span>
                </NavLink>
                <NavLink to="/messages" className={navLinkClasses}>
                  <div className="relative flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages</span>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </div>
                </NavLink>
                <NavLink to="/favorites" className={navLinkClasses}>
                  <Heart className="w-4 h-4" />
                  <span>Favorites</span>
                </NavLink>
              </>
            )}
          </nav>

          {/* User Profile / Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-[#14B8A6] hover:shadow-sm transition-all bg-white"
                >
                  <img
                    src={user.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#14B8A6]/20"
                  />
                  <span className="text-sm font-semibold text-[#142B4A] max-w-[120px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-[#142B4A] truncate">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#14B8A6]"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile & Privacy</span>
                    </Link>

                    <Link
                      to="/my-listings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#14B8A6]"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>My Listings</span>
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#14B8A6]"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Favorites</span>
                    </Link>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-bold text-[#142B4A] hover:text-[#14B8A6] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-[#142B4A] text-white text-sm font-bold hover:bg-[#14B8A6] shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#142B4A] hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClasses}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/buy"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClasses}
          >
            <Building2 className="w-5 h-5" />
            <span>Buy Properties</span>
          </NavLink>
          <NavLink
            to="/sell"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClasses}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Sell / List Property</span>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/my-listings"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileNavLinkClasses}
              >
                <Building2 className="w-5 h-5" />
                <span>My Listings</span>
              </NavLink>
              <NavLink
                to="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileNavLinkClasses}
              >
                <MessageSquare className="w-5 h-5" />
                <div className="flex items-center gap-2">
                  <span>Messages</span>
                  {unreadCount > 0 && (
                    <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </NavLink>
              <NavLink
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileNavLinkClasses}
              >
                <Heart className="w-5 h-5" />
                <span>Saved Favorites</span>
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileNavLinkClasses}
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </NavLink>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-slate-200 text-[#142B4A] font-bold hover:bg-slate-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-[#142B4A] text-white font-bold hover:bg-[#14B8A6] transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#142B4A] text-white pt-16 pb-10 border-t border-[#1e3e68]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6] flex items-center justify-center text-[#142B4A] shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                REALTOR<span className="text-[#14B8A6]">.</span>
              </span>
            </Link>
            <p className="text-[#14B8A6] font-semibold text-sm tracking-wide">
              "Find Your Place. Build Your Future."
            </p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              The unified real estate marketplace empowering property buyers, sellers, and investors with direct owner contact, verified listings, and seamless real-time communication.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
              <span>Secure JWT Authentication & Direct In-App Chat</span>
            </div>
          </div>

          {/* Property Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/buy?category=Individual+Houses" className="hover:text-[#14B8A6] transition-colors">
                  Individual Houses
                </Link>
              </li>
              <li>
                <Link to="/buy?category=Buildings+with+Rental+Units" className="hover:text-[#14B8A6] transition-colors">
                  Buildings with Rental Units
                </Link>
              </li>
              <li>
                <Link to="/buy?category=Villas" className="hover:text-[#14B8A6] transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link to="/buy?category=Land+%2F+Plots" className="hover:text-[#14B8A6] transition-colors">
                  Land & Plots
                </Link>
              </li>
              <li>
                <Link to="/buy?category=Commercial" className="hover:text-[#14B8A6] transition-colors">
                  Commercial Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Popular Cities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/buy?city=Hyderabad" className="hover:text-[#14B8A6] flex items-center gap-1 transition-colors">
                  <span>Hyderabad</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link to="/buy?city=Warangal" className="hover:text-[#14B8A6] flex items-center gap-1 transition-colors">
                  <span>Warangal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link to="/buy?city=Hanamkonda" className="hover:text-[#14B8A6] flex items-center gap-1 transition-colors">
                  <span>Hanamkonda</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link to="/buy?city=Karimnagar" className="hover:text-[#14B8A6] flex items-center gap-1 transition-colors">
                  <span>Karimnagar</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/buy" className="hover:text-[#14B8A6] transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#14B8A6] transition-colors">
                  Post Free Property Ad
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-[#14B8A6] transition-colors">
                  Saved Properties
                </Link>
              </li>
              <li>
                <Link to="/messages" className="hover:text-[#14B8A6] transition-colors">
                  Owner Messages
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#14B8A6] transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="py-4 my-6 px-5 rounded-2xl bg-[#0d1d32] border border-white/5 text-xs text-slate-400 leading-relaxed">
          <span className="font-bold text-[#14B8A6]">Notice / Demo Listing Disclosure: </span>
          All property listings and owner information presented on this platform are demonstration sample data designed to showcase full marketplace architecture, real-time messaging, and multi-step publishing. They do not constitute actual real-world verified listings.
        </div>

        {/* Copyright & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} REALTOR. All rights reserved. Designed for Excellence.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


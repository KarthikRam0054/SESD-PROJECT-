import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      error('Please enter your email/phone and password');
      return;
    }

    try {
      setLoading(true);
      const user = await login(identifier, password);
      success(`Welcome back, ${user.fullName}!`);
      navigate('/');
    } catch (err) {
      error(err.customMessage || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Quick Login Helper
  const handleQuickDemoLogin = async (demoEmail) => {
    try {
      setLoading(true);
      const user = await login(demoEmail, 'password123');
      success(`Logged in as demo ${user.role} (${user.fullName})`);
      navigate('/');
    } catch (err) {
      error(err.customMessage || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-slate-100">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-[#142B4A] flex items-center justify-center text-[#14B8A6] shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#142B4A]">
              REALTOR<span className="text-[#14B8A6]">.</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-[#142B4A]">Sign In to Your Account</h2>
          <p className="text-xs text-slate-500">
            Welcome back! Connect with buyers, sellers, and listings.
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
            ⚡ Quick Evaluation Demo Logins
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('buyer@realtor.com')}
              className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-[#14B8A6] text-xs font-bold text-[#142B4A] transition-all text-center shadow-sm"
            >
              Demo Buyer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('owner@realtor.com')}
              className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-[#14B8A6] text-xs font-bold text-[#142B4A] transition-all text-center shadow-sm"
            >
              Demo Owner
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
              Email or Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="name@example.com or +91 98490..."
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#14B8A6] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[#14B8A6] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-11 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#14B8A6] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#142B4A] hover:bg-[#14B8A6] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-slate-500">
          Don’t have an account?{' '}
          <Link to="/register" className="font-extrabold text-[#14B8A6] hover:underline">
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


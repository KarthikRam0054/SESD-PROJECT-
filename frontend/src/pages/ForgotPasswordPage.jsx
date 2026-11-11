import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, KeyRound, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: enter email, 2: enter code & new pass
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoCodeHint, setDemoCodeHint] = useState('');

  const { success, error, info } = useToast();
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      const res = await authService.forgotPassword(email);
      success(res.message);
      if (res.demoCode) {
        setDemoCodeHint(res.demoCode);
        setCode(res.demoCode);
      }
      setStep(2);
    } catch (err) {
      error(err.customMessage || 'Failed to request reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!code.trim() || !newPassword) return;

    try {
      setLoading(true);
      const res = await authService.resetPassword(email, code, newPassword);
      success(res.message);
      navigate('/login');
    } catch (err) {
      error(err.customMessage || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-slate-100">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-[#142B4A] flex items-center justify-center text-[#14B8A6] shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#142B4A]">
              REALTOR<span className="text-[#14B8A6]">.</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-[#142B4A]">Reset Your Password</h2>
          <p className="text-xs text-slate-500">
            {step === 1
              ? 'Enter your registered email address and we will generate a password reset code.'
              : 'Enter the 6-digit code along with your new password.'}
          </p>
        </div>

        {demoCodeHint && (
          <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold text-center">
            Demo Reset Code: <span className="font-mono font-bold text-sm">{demoCodeHint}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#142B4A] hover:bg-[#14B8A6] text-white font-extrabold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                6-Digit Reset Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-mono tracking-widest focus:outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#14B8A6] hover:bg-[#0d9488] text-white font-extrabold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? 'Updating Password...' : 'Save New Password & Login'}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 text-center"
            >
              Resend Code to another email
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142B4A] hover:text-[#14B8A6]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Mail, Lock, User, ArrowRight, ArrowLeft,
  Eye, EyeOff, Check, ShieldCheck, AlertCircle,
} from 'lucide-react';
import { useAppContext } from '@/src/context/AppContext';

const LOGIN_IMG =
  'https://images.unsplash.com/photo-1572267381740-a871c7a1602f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcG9ldHJ5JTIwYm9vayUyMHZpbnRhZ2UlMjBlbGVnYW50fGVufDF8fHx8MTc3Njc2MDI2NHww&ixlib=rb-4.1.0&q=80&w=1080';

const SIGNUP_IMG =
  'https://images.unsplash.com/photo-1733146852838-edf9ea9cb0d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmFyeSUyMGFuYWx5c2lzJTIwYm9va3MlMjBsaWJyYXJ5JTIwZGFyayUyMGJsdWV8ZW58MXx8fHwxNzc2NzYwMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080';

/* ──────────────────────────────────────────
   GOOGLE SVG
────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
    <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z" />
    <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z" />
    <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
  </svg>
);

/* ══════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════ */
export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email);
    if (result.success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT — photo + overlay ── */}
      <div className="hidden lg:flex relative overflow-hidden">
        <img src={LOGIN_IMG} alt="Poetry" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-indigo-900/90 to-purple-900/80" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.1rem' }}>
              PoetryExplainer
            </span>
          </Link>

          <div>
            <blockquote className="mb-8">
              <p className="text-white/90 mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                "Poetry is not a turning loose of emotion, but an escape from emotion; it is not the expression of personality, but an escape from personality."
              </p>
              <cite className="text-indigo-300 text-sm">— T.S. Eliot</cite>
            </blockquote>
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <span>10,000+ active users</span>
              <span>·</span>
              <span>50,000+ poems analyzed</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT — white form ── */}
      <div className="flex flex-col bg-white">
        {/* ── Top nav bar with back button ── */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-slate-800 font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>PoetryExplainer</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <h1 className="text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700 }}>
              Welcome back
            </h1>
            <p className="text-slate-500">Sign in to continue your poetry journey.</p>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all mb-6 text-sm"
            style={{ fontWeight: 500 }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400">or continue with email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 500 }}>Email Address</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-700" style={{ fontWeight: 500 }}>Password</label>
                <button type="button" className="text-xs text-indigo-600 hover:text-indigo-700">Forgot password?</button>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 transition-all"
              style={{ fontWeight: 600 }}
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-700" style={{ fontWeight: 500 }}>
              Sign up free
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link to="/admin/login" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Admin Panel Access →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

/* ══════════════════════════════════════════
   SIGNUP PAGE
══════════════════════════════════════════ */
export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT — photo + overlay ── */}
      <div className="hidden lg:flex relative overflow-hidden">
        <img src={SIGNUP_IMG} alt="Library" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-indigo-900/90 to-purple-900/85" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.1rem' }}>
              PoetryExplainer
            </span>
          </Link>

          <div>
            <h2 className="text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4 }}>
              Join 10,000+ poetry lovers who read deeper
            </h2>
            <div className="space-y-3 mb-8">
              {[
                '10 free poem analyses every month',
                'Translation in 5 languages',
                'Interactive word dictionary',
                'Save up to 10 poems',
                'No credit card required',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <span>Free forever</span>
              <span>·</span>
              <span>Upgrade anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT — white form ── */}
      <div className="flex items-center justify-center bg-white p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-900" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>PoetryExplainer</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700 }}>
              Create your account
            </h1>
            <p className="text-slate-500">Start understanding poetry in minutes. Free forever.</p>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all mb-6 text-sm"
            style={{ fontWeight: 500 }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400">or sign up with email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 500 }}>Full Name</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 500 }}>Email Address</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 500 }}>Password</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  required
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex gap-1 mt-2 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-orange-400' : 'bg-slate-100'}`} />
                ))}
                <span className="text-xs text-slate-400 ml-2">Fair</span>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded border-2 border-indigo-500 bg-indigo-500 flex items-center justify-center mt-0.5 shrink-0">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <p className="text-xs text-slate-500" style={{ lineHeight: 1.6 }}>
                I agree to the{' '}
                <button type="button" className="text-indigo-600 hover:underline">Terms of Service</button>{' '}
                and{' '}
                <button type="button" className="text-indigo-600 hover:underline">Privacy Policy</button>
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 transition-all mt-2"
              style={{ fontWeight: 600 }}
            >
              Create Account — It's Free <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700" style={{ fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   ADMIN LOGIN PAGE — same split-panel theme as Login / Signup
══════════════════════════════════════════ */

const ADMIN_IMG =
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmFyeSUyMGxpYnJhcnklMjBkYXJrJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY3NjAyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = adminLogin(email, password);
    setIsLoading(false);
    if (result.success) navigate('/admin');
    else setError(result.error || 'Authentication failed.');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT — photo + overlay ── */}
      <div className="hidden lg:flex relative overflow-hidden">
        <img src={ADMIN_IMG} alt="Library" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-indigo-900/90 to-purple-900/85" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.1rem' }}>
              PoetryExplainer
            </span>
          </Link>

          <div>
            <div className="mb-6 w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4 }}>
              Restricted Admin Area
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              This portal is for authorized administrators only. All access attempts are logged and monitored for security.
            </p>
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10">
              <p className="text-red-300 text-xs font-bold uppercase tracking-widest mb-1">Security Notice</p>
              <p className="text-white/50 text-xs leading-relaxed">
                Unauthorized access attempts will be reported to system administrators.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-white/50 text-sm">
            <span>Secure access</span>
            <span>·</span>
            <span>All actions logged</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT — white form ── */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-900" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>PoetryExplainer</span>
            </Link>
          </div>

          <div className="mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700 }}>
              Admin Access
            </h1>
            <p className="text-slate-500">Restricted area. Authorized personnel only.</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 500 }}>Admin Email</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-all">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@poetry.com"
                  required
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 500 }}>Password</label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-all">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  required
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontWeight: 600 }}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link to="/login" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              ← Back to User Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

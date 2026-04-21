import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Feather, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '@/src/context/AppContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-[#F8FAFC]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="mb-10 text-center">
           <div className="mx-auto h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
              <Feather className="h-8 w-8 text-indigo-600" />
           </div>
           <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back</h1>
           <p className="mt-2 text-sm text-slate-500 font-medium italic serif">Continue your scholarly exploration of the verse.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 px-11 py-3.5 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all outline-none text-sm font-medium shadow-sm" 
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Account Secret</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 px-11 py-3.5 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all outline-none text-sm font-medium shadow-sm" 
                 />
              </div>
           </div>

           <button className="w-full py-4 rounded-xl bg-indigo-600 font-bold text-[10px] uppercase tracking-widest text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]">
              Authenticate Session
           </button>
        </form>

        <p className="mt-8 text-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
           New to the archives? <Link to="/signup" className="text-indigo-600 hover:underline underline-offset-4">Enroll for access</Link>
        </p>

        <div className="mt-6 pt-6 border-t border-slate-100">
           <Link 
             to="/admin/login"
             className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors py-2"
           >
             <ShieldCheck className="h-3.5 w-3.5" />
             Admin Login
           </Link>
        </div>
      </div>
    </div>
  );
};

// ── Admin Login Page ────────────────────────────────────────────────
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

    // Simulate a brief authentication delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = adminLogin(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Authentication failed.');
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-[#F8FAFC]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 shadow-xl relative overflow-hidden">
        {/* Red accent bar for admin */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
        
        <div className="mb-10 text-center">
           <div className="mx-auto h-16 w-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
              <ShieldCheck className="h-8 w-8 text-red-600" />
           </div>
           <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Access</h1>
           <p className="mt-2 text-sm text-slate-500 font-medium">Restricted area. Authorized personnel only.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Admin Email</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    required
                    placeholder="admin@poetry.com"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 px-11 py-3.5 text-slate-700 placeholder:text-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all outline-none text-sm font-medium shadow-sm" 
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 px-11 py-3.5 pr-12 text-slate-700 placeholder:text-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all outline-none text-sm font-medium shadow-sm" 
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                 >
                   {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                 </button>
              </div>
           </div>

           <button 
             disabled={isLoading}
             className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-[10px] uppercase tracking-widest text-white hover:from-red-700 hover:to-orange-700 transition-all shadow-lg shadow-red-100 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
           >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Access Admin Panel
                </>
              )}
           </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
           <Link 
             to="/login"
             className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
           >
             <Feather className="h-3.5 w-3.5" />
             Back to User Login
           </Link>
        </div>
      </div>
    </div>
  );
};

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-[#F8FAFC]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="mb-10 text-center">
           <div className="mx-auto h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
              <Feather className="h-8 w-8 text-indigo-600" />
           </div>
           <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h1>
           <p className="mt-2 text-sm text-slate-500 font-medium italic serif">Join the global revolution of literary understanding.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
              <div className="relative">
                 <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 px-11 py-3.5 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all outline-none text-sm font-medium shadow-sm" 
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 px-11 py-3.5 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all outline-none text-sm font-medium shadow-sm" 
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Account Secret</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 px-11 py-3.5 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all outline-none text-sm font-medium shadow-sm" 
                 />
              </div>
           </div>

           <button className="w-full py-4 rounded-xl bg-indigo-600 font-bold text-[10px] uppercase tracking-widest text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]">
              Assemble Identity
           </button>

           <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-white px-4 text-slate-400">Or integrate with</span></div>
           </div>

           <button type="button" className="w-full py-3.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm">
              <img src="https://www.google.com/favicon.ico" className="h-4 w-4" alt="Google" />
              Sync via Google
           </button>
        </form>

        <p className="mt-8 text-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
           Already a member? <Link to="/login" className="text-indigo-600 hover:underline underline-offset-4">Authenticate</Link>
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Feather } from 'lucide-react';
import { useAppContext } from '@/src/context/AppContext';

export const Login: React.FC = () => {
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

        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-3">
           <button 
             onClick={() => { login('admin@poetry.com'); navigate('/admin'); }}
             className="text-[9px] font-black uppercase tracking-tighter text-slate-400 hover:text-indigo-600 transition-colors"
           >
             Testing: Access Admin Terminal
           </button>
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

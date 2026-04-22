import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Search, BookOpen, History, Bookmark, CreditCard,
  Sparkles, MapPin, TrendingUp, Activity, Zap,
  Calendar, Clock, ArrowRight, Star, Globe,
  BarChart3, Award, Target, Flame,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAppContext } from '@/src/context/AppContext';

/* ── mock data ─────────────────────────────────────────────── */
const MOCK_HISTORY = [
  { id: 1, poem: 'Do Not Go Gentle into That Good Night', poet: 'Dylan Thomas',    lang: 'English', time: '2h ago',    credits: 1 },
  { id: 2, poem: 'Shall I Compare Thee to a Summer\'s Day',poet: 'Shakespeare',    lang: 'Urdu',    time: '1d ago',    credits: 1 },
  { id: 3, poem: 'Ode on a Grecian Urn',                   poet: 'John Keats',     lang: 'Spanish', time: '2d ago',    credits: 1 },
  { id: 4, poem: 'The Road Not Taken',                     poet: 'Robert Frost',   lang: 'English', time: '3d ago',    credits: 1 },
  { id: 5, poem: 'I Wandered Lonely as a Cloud',           poet: 'Wordsworth',     lang: 'Arabic',  time: '5d ago',    credits: 1 },
];

const MOCK_PURCHASES = [
  { plan: 'Free Plan', date: 'Apr 22, 2026  ·  1:10 PM', price: '$0.00', credits: 20,  status: 'Active' },
  { plan: 'Scholar Pro', date: 'Mar 15, 2026  ·  9:42 AM', price: '$9.99', credits: 200, status: 'Expired' },
];

const WEEKLY = [8, 14, 6, 18, 11, 20, 15];
const DAYS   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

/* ── nav tabs ──────────────────────────────────────────────── */
const TABS = [
  { id:'overview',  label:'Overview',     icon: Activity  },
  { id:'explore',   label:'Explore Poems',icon: Search    },
  { id:'history',   label:'History',      icon: History   },
  { id:'saved',     label:'Saved',        icon: Bookmark  },
  { id:'pricing',   label:'Pricing',      icon: CreditCard},
];

/* ══════════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════════ */
export const Dashboard: React.FC = () => {
  const { user } = useAppContext();
  const navigate  = useNavigate();
  const [tab, setTab]       = useState('overview');
  const [location, setLoc]  = useState<{ city: string; country: string } | null>(null);

  const maxCredits = user?.plan === 'pro' ? 200 : 20;
  const usedCredits = maxCredits - (user?.credits ?? 0);
  const usedPct     = Math.min((usedCredits / maxCredits) * 100, 100);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => setLoc({ city: d.city ?? 'Unknown', country: d.country_name ?? '' }))
      .catch(() => setLoc({ city: 'Unknown', country: '' }));
  }, []);

  const handleTabClick = (id: string) => {
    if (id === 'explore') { navigate('/explore'); return; }
    if (id === 'history') { navigate('/history'); return; }
    if (id === 'saved')   { navigate('/saved');   return; }
    setTab(id);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top Navigation ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {TABS.map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabClick(t.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}

            <div className="ml-auto pl-4 shrink-0">
              <Link
                to="/analyze"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                New Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* Overview Tab */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Welcome Banner */}
            <div className="rounded-3xl bg-indigo-50 border border-indigo-100 px-8 py-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-black text-white">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-indigo-400 text-sm font-medium mb-1">Welcome back</p>
                    <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
                    <p className="text-slate-400 text-sm mt-0.5">{user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-white border border-indigo-100 px-4 py-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span className="text-slate-700 text-sm font-semibold capitalize">{user?.plan} Plan</span>
                  </div>
                  {location && (
                    <div className="flex items-center gap-2 rounded-xl bg-white border border-indigo-100 px-4 py-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-slate-700 text-sm font-semibold">{location.city}{location.country ? `, ${location.country}` : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 rounded-xl bg-white border border-indigo-100 px-4 py-2">
                    <Calendar className="h-4 w-4 text-indigo-400" />
                    <span className="text-slate-700 text-sm font-semibold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Credits Left',    value: user?.credits ?? 0,  icon: Zap,       color: 'from-indigo-500 to-purple-600', sub: `of ${maxCredits} total` },
                { label: 'Poems Analyzed',  value: usedCredits,          icon: BookOpen,  color: 'from-purple-500 to-violet-600', sub: 'all time' },
                { label: 'Day Streak',       value: 7,                   icon: Flame,     color: 'from-orange-400 to-rose-500',   sub: 'consecutive days' },
                { label: 'Languages Used',   value: 4,                   icon: Globe,     color: 'from-teal-500 to-cyan-500',     sub: 'distinct' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-black text-slate-900">{s.value}</div>
                    <div className="text-sm font-semibold text-slate-700 mt-0.5">{s.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Middle Row: Credits + Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Credits Card */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Credits & Usage</h3>
                    <p className="text-slate-400 text-sm mt-0.5">Your analysis balance</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Target className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>

                {/* Big credit number */}
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-5xl font-black text-slate-900">{user?.credits}</span>
                  <span className="text-slate-400 text-lg mb-1.5 font-semibold">/ {maxCredits}</span>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${usedPct}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full bg-indigo-600"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-medium mb-6">
                  <span>{usedCredits} used</span>
                  <span>{user?.credits} remaining</span>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  {[
                    { label: 'Analyses completed', val: usedCredits, color: 'bg-indigo-500' },
                    { label: 'Available credits',   val: user?.credits ?? 0, color: 'bg-purple-400' },
                  ].map(r => (
                    <div key={r.label} className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${r.color} shrink-0`} />
                      <span className="text-sm text-slate-600 flex-1">{r.label}</span>
                      <span className="text-sm font-bold text-slate-900">{r.val}</span>
                    </div>
                  ))}
                </div>

                <Link to="/dashboard/pricing" className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-all">
                  Upgrade Plan <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Weekly Performance */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                className="rounded-2xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Weekly Activity</h3>
                    <p className="text-slate-400 text-sm mt-0.5">Analyses per day this week</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-2 h-36 mb-3">
                  {WEEKLY.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }} animate={{ height: `${(v / 20) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
                        className={cn(
                          'w-full rounded-t-lg',
                          i === 5 ? 'bg-indigo-600' : 'bg-slate-100 hover:bg-indigo-100 transition-colors'
                        )}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {DAYS.map((d, i) => (
                    <div key={d} className={cn('flex-1 text-center text-[10px] font-bold', i === 5 ? 'text-indigo-600' : 'text-slate-400')}>{d}</div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3">
                  <BarChart3 className="h-5 w-5 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Peak day: Saturday — 20 analyses</p>
                    <p className="text-xs text-slate-500">+33% vs last week</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Recent Analyses</h3>
                  <p className="text-slate-400 text-sm mt-0.5">Your last {MOCK_HISTORY.length} poems</p>
                </div>
                <Link to="/history" className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="divide-y divide-slate-50">
                {MOCK_HISTORY.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                    className="flex items-center gap-4 px-7 py-4 hover:bg-slate-50/60 transition-colors group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-all">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate group-hover:text-indigo-700 transition-colors">{item.poem}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.poet} · {item.lang}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 font-semibold border border-indigo-100">{item.lang}</span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        )}

        {/* Pricing History Tab */}
        {tab === 'pricing' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Pricing History</h2>
              <p className="text-slate-500 mt-1">Your purchase and subscription history</p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-7 py-5 border-b border-slate-100">
                <div className="grid grid-cols-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Plan</span><span>Date & Time</span><span>Credits</span><span>Amount</span>
                </div>
              </div>
              <div className="divide-y divide-slate-50">
                {MOCK_PURCHASES.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="grid grid-cols-4 items-center px-7 py-5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{p.plan}</p>
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', p.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-100 text-slate-500')}>{p.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">{p.date}</p>
                    <p className="text-sm font-semibold text-indigo-600">{p.credits} credits</p>
                    <p className="text-sm font-bold text-slate-900">{p.price}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Unlock unlimited analyses</h3>
              <p className="text-slate-500 text-sm mb-6">Upgrade to Scholar Pro and get 200 credits/month, priority AI access, and more.</p>
              <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all">
                View Plans <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

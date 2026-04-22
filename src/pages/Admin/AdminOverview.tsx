import React from 'react';
import { motion } from 'motion/react';
import {
  Users, CreditCard, TrendingUp, Clock,
  ArrowUpRight, ArrowDownRight, BookOpen, BarChart3,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/src/lib/utils';

const ACTIVITY_DATA = [
  { day: 'Mon', users: 400, credits: 2400 },
  { day: 'Tue', users: 300, credits: 1398 },
  { day: 'Wed', users: 520, credits: 4800 },
  { day: 'Thu', users: 278, credits: 3908 },
  { day: 'Fri', users: 189, credits: 2800 },
  { day: 'Sat', users: 390, credits: 3800 },
  { day: 'Sun', users: 490, credits: 5300 },
];

const PROMINENT_ANALYSES = [
  { poem: '"Ariel"',                  poet: 'Sylvia Plath',      explorations: 199, pct: 99 },
  { poem: '"The Waste Land"',         poet: 'T.S. Eliot',        explorations: 120, pct: 60 },
  { poem: '"Ode to a Grecian Urn"',   poet: 'John Keats',        explorations: 137, pct: 69 },
  { poem: '"The Raven"',              poet: 'Edgar Allan Poe',   explorations: 83,  pct: 42 },
];

const EPOCHS = [
  { label: 'Romantic Era',        pct: 45, color: 'bg-orange-400' },
  { label: 'Modernist Wave',      pct: 30, color: 'bg-rose-300'   },
  { label: 'Contemporary Verse',  pct: 15, color: 'bg-orange-200' },
  { label: 'Victorian Classicism',pct: 10, color: 'bg-slate-300'  },
];

export const AdminOverview: React.FC = () => (
  <div className="space-y-8 px-4 md:px-8 lg:px-12 py-8">
    <div>
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Overview</h1>
      <p className="text-sm text-slate-500 mt-1 italic">Manage your literary platform and track activity with precision.</p>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {[
        { title: 'Total Users',    value: '12,482', change: '+12.5%', up: true,  icon: <Users className="h-4 w-4" /> },
        { title: 'Credits Used',   value: '45,201', change: '+8.2%',  up: true,  icon: <CreditCard className="h-4 w-4" /> },
        { title: 'Monthly Revenue',value: '$14,204', change: '-2.4%', up: false, icon: <TrendingUp className="h-4 w-4" /> },
        { title: 'Active Now',     value: '842',    change: '+18%',   up: true,  icon: <Clock className="h-4 w-4" /> },
      ].map(s => (
        <motion.div key={s.title} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">{s.icon}</div>
            <span className={cn('flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full',
              s.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
              {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {s.change}
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{s.title}</p>
          <p className="text-2xl font-black text-slate-900">{s.value}</p>
        </motion.div>
      ))}
    </div>

    {/* Activity Chart + Recent Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Activity</h3>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 outline-none">
            <option>Last 7 Days</option><option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ACTIVITY_DATA}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-8} />
              <Tooltip contentStyle={{ backgroundColor:'#fff', borderColor:'#e2e8f0', borderRadius:'12px', fontSize:'12px' }} />
              <Area type="monotone" dataKey="users" stroke="#F97316" fill="url(#cg)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity — soft white card */}
      <div className="rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Recent Activity</h3>
        <div className="space-y-5">
          {[
            { name:'John Doe',    action:"upgraded to Pro",          time:'2 min ago',  emoji:'🚀' },
            { name:'Alice Smith', action:"analyzed 'The Raven'",     time:'15 min ago', emoji:'📜' },
            { name:'Admin',       action:"deleted 2 spam blogs",      time:'1 hr ago',   emoji:'🧹' },
            { name:'Mark Zeo',    action:"exhausted credits",         time:'3 hr ago',   emoji:'⏳' },
            { name:'Sara K.',     action:"published a new blog",      time:'5 hr ago',   emoji:'✍️' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-lg shrink-0">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate"><span className="text-indigo-600">{a.name}</span> {a.action}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Prominent Analyses + Epoch Concentration */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Prominent Analyses */}
      <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Prominent Analyses</h3>
            <p className="text-xs text-slate-400">Most explored poems this month</p>
          </div>
        </div>
        <div className="space-y-5">
          {PROMINENT_ANALYSES.map((p, i) => (
            <div key={p.poem}>
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="text-sm font-bold text-slate-800">{p.poem}</span>
                  <span className="text-xs text-slate-400 ml-2">— {p.poet}</span>
                </div>
                <span className="text-xs font-black text-indigo-600">{p.explorations} explorations</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="h-full rounded-full bg-indigo-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Epoch Concentration */}
      <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Epoch Concentration</h3>
            <p className="text-xs text-slate-400">Distribution of analyses by literary era</p>
          </div>
        </div>

        {/* Stacked visual bar */}
        <div className="flex h-5 w-full rounded-full overflow-hidden mb-6 gap-0.5">
          {EPOCHS.map(e => (
            <motion.div key={e.label} initial={{ width: 0 }} animate={{ width: `${e.pct}%` }}
              transition={{ duration: 0.6 }} className={`${e.color} h-full`} />
          ))}
        </div>

        <div className="space-y-4">
          {EPOCHS.map((e, i) => (
            <div key={e.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${e.color}`} />
                <span className="text-sm font-semibold text-slate-700">{e.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${e.pct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className={`h-full rounded-full ${e.color}`} />
                </div>
                <span className="text-sm font-black text-slate-900 w-8 text-right">{e.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

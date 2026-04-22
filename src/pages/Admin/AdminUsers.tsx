import React, { useState } from 'react';
import {
  Users, Search, Filter, Mail, ShieldAlert,
  ArrowUpDown, Zap, Layers, Clock, Hash,
  ChevronDown, ChevronUp, CreditCard, BookOpen,
  Activity, MoreVertical, UserPlus,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

/* ── Mock user data with full history ─────────────────────────── */
const MOCK_USERS = [
  {
    id: '1', name: 'Dianne Russell', email: 'dianne@example.com',
    plan: 'Pro', creditsLeft: 158, creditsUsed: 42, totalSearches: 42,
    joinDate: 'Apr 12, 2024', lastActive: '2 min ago', status: 'Active',
    history: [
      { poem: 'Do Not Go Gentle…',    lang: 'English', credits: 1, time: '2 min ago',    tokens: 820  },
      { poem: 'Shall I Compare Thee', lang: 'Urdu',    credits: 1, time: '1 hr ago',     tokens: 960  },
      { poem: 'Ode on a Grecian Urn', lang: 'Spanish', credits: 1, time: '3 hr ago',     tokens: 740  },
      { poem: 'The Road Not Taken',   lang: 'English', credits: 1, time: 'Yesterday',    tokens: 890  },
      { poem: 'Ariel',                lang: 'French',  credits: 1, time: '2 days ago',   tokens: 1020 },
    ],
  },
  {
    id: '2', name: 'Guy Hawkins', email: 'guy@example.com',
    plan: 'Free', creditsLeft: 8, creditsUsed: 12, totalSearches: 12,
    joinDate: 'Mar 28, 2024', lastActive: '4 hr ago', status: 'Active',
    history: [
      { poem: 'The Raven',            lang: 'English', credits: 1, time: '4 hr ago',     tokens: 700  },
      { poem: 'Daffodils',            lang: 'Hindi',   credits: 1, time: 'Yesterday',    tokens: 640  },
      { poem: 'Ozymandias',           lang: 'English', credits: 1, time: '3 days ago',   tokens: 780  },
    ],
  },
  {
    id: '3', name: 'Jerome Bell', email: 'jerome@example.com',
    plan: 'Pro', creditsLeft: 158, creditsUsed: 42, totalSearches: 42,
    joinDate: 'Feb 14, 2024', lastActive: '1 day ago', status: 'Idle',
    history: [
      { poem: 'Ode to the West Wind', lang: 'Arabic',  credits: 1, time: '1 day ago',   tokens: 910  },
      { poem: 'Kubla Khan',           lang: 'English', credits: 1, time: '3 days ago',   tokens: 860  },
    ],
  },
  {
    id: '4', name: 'Eleanor Pena', email: 'eleanor@example.com',
    plan: 'Free', creditsLeft: 0, creditsUsed: 20, totalSearches: 20,
    joinDate: 'Jan 02, 2024', lastActive: '5 days ago', status: 'Suspended',
    history: [
      { poem: 'Stopping by Woods',    lang: 'Urdu',    credits: 1, time: '5 days ago',   tokens: 750  },
    ],
  },
  {
    id: '5', name: 'Robert Fox', email: 'robert@example.com',
    plan: 'Pro', creditsLeft: 198, creditsUsed: 2, totalSearches: 2,
    joinDate: 'Dec 24, 2023', lastActive: '2 weeks ago', status: 'Idle',
    history: [
      { poem: 'The Waste Land',       lang: 'English', credits: 1, time: '2 weeks ago',  tokens: 1240 },
      { poem: 'Paradise Lost (Exc.)', lang: 'English', credits: 1, time: '3 weeks ago',  tokens: 1100 },
    ],
  },
];

type User = typeof MOCK_USERS[0];

export const AdminUsers: React.FC = () => {
  const [search, setSearch]       = useState('');
  const [expanded, setExpanded]   = useState<string | null>(null);
  const [filterPlan, setFilterPlan] = useState<'All' | 'Pro' | 'Free'>('All');

  const filtered = MOCK_USERS.filter(u => {
    const q = search.toLowerCase();
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchP = filterPlan === 'All' || u.plan === filterPlan;
    return matchQ && matchP;
  });

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Complete activity history, credit usage, and per-prompt analysis for every user.</p>
        </div>
        <button className="flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-xs font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
          <UserPlus className="h-4 w-4" /> Onboard Member
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users',    value: MOCK_USERS.length,                        icon: <Users className="h-4 w-4" />,       color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Total Searches', value: MOCK_USERS.reduce((a,u)=>a+u.totalSearches,0), icon: <BookOpen className="h-4 w-4" />, color: 'bg-purple-50 text-purple-600' },
          { label: 'Credits Used',   value: MOCK_USERS.reduce((a,u)=>a+u.creditsUsed,0),  icon: <CreditCard className="h-4 w-4" />, color: 'bg-violet-50 text-violet-600' },
          { label: 'Active Now',     value: MOCK_USERS.filter(u=>u.status==='Active').length, icon: <Activity className="h-4 w-4" />, color: 'bg-emerald-50 text-emerald-600' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full h-11 rounded-xl bg-white border border-slate-200 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
          />
        </div>
        {(['All','Pro','Free'] as const).map(p => (
          <button key={p} onClick={() => setFilterPlan(p)}
            className={cn('h-11 px-5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all',
              filterPlan === p
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-700'
            )}>
            {p}
          </button>
        ))}
      </div>

      {/* User Table */}
      <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-6 py-4 bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1">Member <ArrowUpDown className="h-3 w-3" /></span>
          <span>Plan</span>
          <span>Searches</span>
          <span>Credits Used</span>
          <span>Last Active</span>
          <span />
        </div>

        {filtered.map(user => (
          <div key={user.id} className="border-b border-slate-50 last:border-0">
            {/* User row */}
            <div
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-6 py-5 hover:bg-slate-50/50 transition-colors cursor-pointer items-center"
              onClick={() => setExpanded(expanded === user.id ? null : user.id)}
            >
              {/* Identity */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-black text-sm shrink-0">
                  {user.name[0]}{user.name.split(' ')[1]?.[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                </div>
                <span className={cn('ml-2 h-2 w-2 rounded-full',
                  user.status==='Active' ? 'bg-emerald-500' : user.status==='Idle' ? 'bg-amber-400' : 'bg-rose-400'
                )} />
              </div>

              {/* Plan */}
              <div>
                <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border',
                  user.plan==='Pro' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                )}>
                  {user.plan==='Pro' ? <Zap className="h-3 w-3" /> : <Layers className="h-3 w-3" />} {user.plan}
                </span>
              </div>

              {/* Searches */}
              <div className="flex items-center gap-2">
                <Hash className="h-3.5 w-3.5 text-slate-300" />
                <span className="text-sm font-bold text-slate-700">{user.totalSearches}</span>
              </div>

              {/* Credits */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm font-bold text-slate-700">{user.creditsUsed}</span>
                  <span className="text-[10px] text-slate-400">/ {user.creditsUsed + user.creditsLeft}</span>
                </div>
                <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                  <div className={cn('h-full rounded-full',
                    user.creditsLeft===0 ? 'bg-rose-500' : user.creditsUsed/(user.creditsUsed+user.creditsLeft)>0.7 ? 'bg-amber-500' : 'bg-indigo-500'
                  )} style={{ width:`${(user.creditsUsed/(user.creditsUsed+user.creditsLeft))*100}%` }} />
                </div>
              </div>

              {/* Last active */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" /> {user.lastActive}
              </div>

              {/* Expand toggle */}
              <div className="flex items-center justify-end gap-2">
                <button className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all">
                  <ShieldAlert className="h-3.5 w-3.5" />
                </button>
                <button className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-indigo-500">
                  {expanded===user.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Expanded history panel */}
            {expanded === user.id && (
              <div className="px-6 pb-6 bg-slate-50/70 border-t border-slate-100">
                <div className="pt-5">
                  {/* Mini stats for this user */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Total Analyses',   value: user.totalSearches },
                      { label: 'Credits Spent',     value: user.creditsUsed },
                      { label: 'Credits Remaining', value: user.creditsLeft  },
                      { label: 'Avg Tokens/Prompt', value: Math.round(user.history.reduce((a,h)=>a+h.tokens,0)/user.history.length || 0) },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                        <p className="text-xl font-black text-slate-900">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Per-prompt history */}
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Per-Prompt Analysis History</h4>
                  <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <th className="px-5 py-3">#</th>
                          <th className="px-5 py-3">Poem Analyzed</th>
                          <th className="px-5 py-3">Target Language</th>
                          <th className="px-5 py-3">Credits Used</th>
                          <th className="px-5 py-3">Tokens</th>
                          <th className="px-5 py-3">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {user.history.map((h, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-3.5 text-xs text-slate-300 font-bold">{i+1}</td>
                            <td className="px-5 py-3.5">
                              <span className="text-sm font-semibold text-slate-800">{h.poem}</span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                                {h.lang}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                                <CreditCard className="h-3 w-3" /> {h.credits}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-xs font-mono text-slate-500">{h.tokens.toLocaleString()}</td>
                            <td className="px-5 py-3.5 text-xs text-slate-400">{h.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

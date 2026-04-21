import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreVertical
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/src/lib/utils';

const data = [
  { name: 'Mon', users: 400, credits: 2400 },
  { name: 'Tue', users: 300, credits: 1398 },
  { name: 'Wed', users: 200, credits: 9800 },
  { name: 'Thu', users: 278, credits: 3908 },
  { name: 'Fri', users: 189, credits: 4800 },
  { name: 'Sat', users: 239, credits: 3800 },
  { name: 'Sun', users: 349, credits: 4300 },
];

export const AdminOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Overview</h1>
        <p className="text-sm text-slate-500 font-medium italic serif">Manage your literary empire and track platform health with precision.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatsCard 
           title="Total Users" 
           value="12,482" 
           change="+12.5%" 
           trend="up" 
           icon={<Users className="h-4 w-4" />} 
         />
         <StatsCard 
           title="Credits Used" 
           value="45,201" 
           change="+8.2%" 
           trend="up" 
           icon={<CreditCard className="h-4 w-4" />} 
         />
         <StatsCard 
           title="Monthly Revenue" 
           value="$14,204" 
           change="-2.4%" 
           trend="down" 
           icon={<TrendingUp className="h-4 w-4" />} 
         />
         <StatsCard 
           title="Active Now" 
           value="842" 
           change="+18%" 
           trend="up" 
           icon={<Clock className="h-4 w-4" />} 
         />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activity Trends</h3>
               <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
               </select>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#1e293b', fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs mb-8">Recent Activity</h3>
            <div className="space-y-6">
                <ActivityItem name="John Doe" action="upgraded to Pro" time="2 mins ago" emoji="🚀" />
                <ActivityItem name="Alice Smith" action="analyzed 'The Raven'" time="15 mins ago" emoji="📜" />
                <ActivityItem name="Admin" action="deleted 2 spam blogs" time="1 hour ago" emoji="🧹" />
                <ActivityItem name="Mark Zeo" action="exhausted credits" time="3 hours ago" emoji="⏳" />
                <ActivityItem name="Sara K." action="published a new blog" time="5 hours ago" emoji="✍️" />
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-white/5 text-slate-400 font-bold text-xs hover:bg-white/10 transition-all uppercase tracking-widest">
               View Full Logs
            </button>
         </div>
      </div>

      {/* User Table (Small Preview) */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
         <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Users</h3>
            <button className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline">
               Explore Full Directory <ArrowUpRight className="h-3 w-3" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                     <th className="px-8 py-4">Identity</th>
                     <th className="px-8 py-4">Account Type</th>
                     <th className="px-8 py-4">Balance</th>
                     <th className="px-8 py-4 text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  <UserRow name="Jane Cooper" email="jane@example.com" plan="Pro" credits="942" status="Active" />
                  <UserRow name="Cody Fisher" email="cody@example.com" plan="Free" credits="4" status="Idle" />
                  <UserRow name="Esther Howard" email="esther@example.com" plan="Pro" credits="1,200" status="Active" />
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, change, trend, icon }: { title: string, value: string, change: string, trend: 'up' | 'down', icon: React.ReactNode }) => (
  <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all group shadow-sm">
     <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
           {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
          trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </div>
     </div>
     <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</h4>
     <p className="text-2xl font-bold text-slate-800">{value}</p>
  </div>
);

const ActivityItem = ({ name, action, time, emoji }: any) => (
  <div className="flex items-center gap-4 group cursor-pointer">
     <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm">
        {emoji}
     </div>
     <div className="flex-1 overflow-hidden">
        <p className="text-xs font-semibold text-slate-700 truncate"><span className="text-indigo-600 underline underline-offset-2">{name}</span> {action}</p>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight mt-0.5">{time}</p>
     </div>
  </div>
);

const UserRow = ({ name, email, plan, credits, status }: any) => (
  <tr className="hover:bg-slate-50/50 transition-colors group">
     <td className="px-8 py-4">
        <div className="flex items-center gap-3">
           <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">{name[0]}</div>
           <div>
              <p className="text-sm font-bold text-slate-800 leading-none mb-1">{name}</p>
              <p className="text-[10px] text-slate-400 leading-none font-medium uppercase tracking-tight">{email}</p>
           </div>
        </div>
     </td>
     <td className="px-8 py-4">
        <span className={cn(
          "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
          plan === 'Pro' ? "bg-indigo-50 text-indigo-600 border border-indigo-100" : "bg-slate-50 text-slate-500 border border-slate-100"
        )}>{plan}</span>
     </td>
     <td className="px-8 py-4 text-xs font-mono text-slate-500 font-bold">{credits}</td>
     <td className="px-8 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
           <span className={cn(
             "h-1.5 w-1.5 rounded-full shadow-sm",
             status === 'Active' ? "bg-emerald-500" : "bg-amber-500"
           )} />
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{status}</span>
        </div>
     </td>
  </tr>
);

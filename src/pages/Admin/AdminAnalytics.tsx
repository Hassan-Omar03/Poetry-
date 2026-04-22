import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Activity, 
  Map, 
  Quote,
  Feather,
  Zap
} from 'lucide-react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/src/lib/utils';

export const AdminAnalytics: React.FC = () => {
  const activityData = [
    { name: 'Mon', analyses: 400, chat: 240 },
    { name: 'Tue', analyses: 300, chat: 139 },
    { name: 'Wed', analyses: 200, chat: 980 },
    { name: 'Thu', analyses: 278, chat: 390 },
    { name: 'Fri', analyses: 189, chat: 480 },
    { name: 'Sat', analyses: 239, chat: 380 },
    { name: 'Sun', analyses: 349, chat: 430 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Analytics</h1>
          <p className="text-sm text-slate-500 font-medium italic serif">Advanced telemetric oversight for the literary ecosystem.</p>
        </div>
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
           <button className="px-4 py-1.5 rounded-md bg-white text-[10px] font-bold uppercase text-purple-600 shadow-sm border border-slate-200/50">Real-time stats</button>
           <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-slate-800 text-[10px] font-bold uppercase transition-colors">Historical logs</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <AnalyticsCard title="Feature Engagement" subtitle="Analysis vs AI Counselor metrics">
            <div className="h-80 w-full mt-6">
               <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="analyses" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="chat" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
               </ResponsiveContainer>
            </div>
         </AnalyticsCard>

         <AnalyticsCard title="Growth Velocity" subtitle="Daily registration enrollment">
            <div className="h-80 w-full mt-6">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="analyses" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </AnalyticsCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
               <Quote className="h-4 w-4" />
               Prominent Analyses
            </h3>
            <div className="space-y-4">
               {['The Raven', 'The Waste Land', 'Ariel', 'Ode to a Grecian Urn'].map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-xs group cursor-pointer">
                     <span className="text-slate-600 group-hover:text-purple-600 transition-colors serif italic font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">“{p}”</span>
                     <span className="text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md uppercase tracking-tighter shrink-0 ml-4">{Math.floor(Math.random() * 200)} explorations</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
               <Feather className="h-4 w-4" />
               Epoch Concentration
            </h3>
            <div className="space-y-4">
               {[
                  { era: 'Romantic Era', percent: 45 },
                  { era: 'Modernist Wave', percent: 30 },
                  { era: 'Contemporary Verse', percent: 15 },
                  { era: 'Victorian Classicism', percent: 10 },
               ].map((e, i) => (
                  <div key={i} className="space-y-1.5">
                     <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-slate-700">{e.era}</span>
                        <span className="text-slate-400">{e.percent}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-lg overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-lg shadow-sm" style={{ width: `${e.percent}%` }} />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="rounded-2xl border-2 border-purple-200 border-dashed bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center text-center justify-center h-full gap-4">
               <div className="h-12 w-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-100">
                  <Zap className="h-6 w-6" />
               </div>
               <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-widest text-[10px]">Real-time Pulse</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium italic serif leading-snug">The engine is currently facilitating 242 active literary sessions.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
     <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
        <TrendingUp className="h-4 w-4 text-emerald-500" />
     </div>
     <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black leading-none mb-4">{subtitle}</p>
     {children}
  </div>
);

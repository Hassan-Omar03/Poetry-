import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  CreditCard, 
  Clock, 
  History, 
  MessageSquare, 
  Search, 
  ShieldAlert,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const AdminUserDetail: React.FC = () => {
  const { userId } = useParams();

  // Mock user data
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    credits: 14,
    plan: 'free',
    joinDate: '2024-01-12',
    lastActive: '2024-03-22 14:30',
    isBlocked: false,
    usage: [
      { id: '1', date: '2024-03-22', type: 'Analysis', cost: 1, poem: 'The Road Not Taken' },
      { id: '2', date: '2024-03-21', type: 'Analysis', cost: 1, poem: 'Daffodils' },
      { id: '3', date: '2024-03-21', type: 'Chat', cost: 0.5, poem: 'Daffodils' },
    ],
    chatHistory: [
      { id: '1', date: '2024-03-21', title: 'Symbolism in Frost' },
      { id: '2', date: '2024-03-18', title: 'Why did Keats use...?' },
    ],
    searchHistory: [
      'The Raven',
      'Maya Angelou',
      'Modernism in 2024',
      'Shakespeare Sonnets'
    ]
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link to="/admin/users" className="h-10 w-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
           <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">User Intelligence</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-8">
           <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-50 blur-3xl" />
              
              <div className="flex flex-col items-center text-center">
                 <div className="h-24 w-24 rounded-2xl bg-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-xl shadow-purple-100 italic serif">
                    {user.name[0]}
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{user.name}</h2>
                 <p className="text-sm text-slate-400 font-medium">{user.email}</p>
                 
                 <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                       <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Credits</p>
                       <p className="text-xl font-bold text-purple-600 tracking-tighter">{user.credits}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                       <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Plan</p>
                       <span className="px-2 py-0.5 rounded-lg bg-purple-600 text-white text-[10px] font-bold uppercase">{user.plan}</span>
                    </div>
                 </div>

                 <div className="mt-8 w-full space-y-3">
                    <ActionButton icon={<ShieldAlert className="h-4 w-4" />} label="Suspend Access" variant="danger" />
                    <ActionButton icon={<CreditCard className="h-4 w-4" />} label="Manual Credit Adjust" />
                 </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 space-y-4">
                 <InfoItem icon={<Calendar className="h-4 w-4" />} label="Join date" value={user.joinDate} />
                 <InfoItem icon={<Clock className="h-4 w-4" />} label="Last observed" value={user.lastActive} />
              </div>
           </div>

           <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                 <Search className="h-4 w-4" />
                 Poetic Inquiries
              </h3>
              <div className="space-y-2">
                 {user.searchHistory.map((query, i) => (
                    <div key={i} className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 hover:text-purple-600 hover:bg-white transition-all cursor-pointer flex items-center justify-between group">
                       {query}
                       <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Usage & History */}
        <div className="lg:col-span-2 space-y-8">
           <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                 <History className="h-4 w-4" />
                 Resource Consumption
              </h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                       <tr>
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Action</th>
                          <th className="pb-4">Topic</th>
                          <th className="pb-4 text-right">Debit</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                       {user.usage.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="py-4 text-slate-500">{item.date}</td>
                             <td className="py-4 font-bold text-slate-800">{item.type}</td>
                             <td className="py-4 text-slate-500 serif italic">"{item.poem}"</td>
                             <td className="py-4 text-right font-mono text-purple-600 font-bold">-{item.cost}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                 <MessageSquare className="h-4 w-4" />
                 Counselor Archive
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {user.chatHistory.map(chat => (
                    <div key={chat.id} className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-300 transition-all cursor-pointer group">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{chat.date}</p>
                       <h4 className="text-sm font-bold text-slate-800 group-hover:text-purple-600 transition-colors mb-4">{chat.title}</h4>
                       <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 group-hover:text-slate-800">
                          Examine Log
                          <ArrowLeft className="h-3 w-3 rotate-180" />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, variant = 'default' }: { icon: React.ReactNode, label: string, variant?: 'default' | 'danger' }) => (
  <button className={cn(
    "flex w-full items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold transition-all border",
    variant === 'danger' 
      ? "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white" 
      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
  )}>
     {icon}
     {label}
  </button>
);

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center justify-between text-xs">
     <div className="flex items-center gap-2 text-slate-500 font-medium">
        {icon}
        <span>{label}</span>
     </div>
     <span className="font-bold text-slate-800">{value}</span>
  </div>
);

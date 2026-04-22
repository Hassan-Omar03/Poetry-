import React from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldAlert, 
  Mail, 
  UserPlus,
  ArrowUpDown,
  Zap,
  Layers
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export const AdminUsers: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">User Management</h1>
          <p className="text-sm text-slate-500 font-medium italic serif">Supervise and curate the community of poetic explorers.</p>
        </div>
        <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 text-[10px] uppercase tracking-widest font-bold text-white transition-all hover:bg-purple-700 shadow-lg shadow-purple-100">
           <UserPlus className="h-4 w-4" />
           Onboard New Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
               placeholder="Identify user by name, email or access ID..." 
               className="w-full h-11 rounded-lg bg-white border border-slate-200 pl-11 pr-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-xs font-medium text-slate-600 shadow-sm"
            />
         </div>
         <button className="h-11 px-6 rounded-lg border border-slate-200 bg-white flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest font-bold hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="h-3.5 w-3.5" />
            Filter Directory
         </button>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                     <th className="px-8 py-5">
                       <div className="flex items-center gap-2">Member <ArrowUpDown className="h-3 w-3" /></div>
                     </th>
                     <th className="px-8 py-5">Tier</th>
                     <th className="px-8 py-5">Resource Balance</th>
                     <th className="px-8 py-5 text-center">Registration</th>
                     <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  <UserTableRow id="1" name="Dianne Russell" email="dianne@example.com" plan="Pro" usage={85} date="Apr 12, 2024" />
                  <UserTableRow id="2" name="Guy Hawkins" email="guy@example.com" plan="Free" usage={12} date="Mar 28, 2024" />
                  <UserTableRow id="3" name="Jerome Bell" email="jerome@example.com" plan="Pro" usage={42} date="Feb 14, 2024" />
                  <UserTableRow id="4" name="Eleanor Pena" email="eleanor@example.com" plan="Free" usage={98} date="Jan 02, 2024" />
                  <UserTableRow id="5" name="Robert Fox" email="robert@example.com" plan="Pro" usage={2} date="Dec 24, 2023" />
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

const UserTableRow = ({ id, name, email, plan, usage, date }: any) => (
  <tr className="hover:bg-slate-50/50 transition-colors group">
     <td className="px-8 py-6">
        <Link to={`/admin/users/${id}`} className="flex items-center gap-4 cursor-pointer">
           <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs uppercase shadow-sm">
              {name[0]}{name.split(' ')[1]?.[0]}
           </div>
           <div>
              <p className="text-sm font-bold text-slate-800 hover:text-purple-600 transition-colors">{name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                 <Mail className="h-3 w-3 text-slate-400" />
                 <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{email}</p>
              </div>
           </div>
        </Link>
     </td>
     <td className="px-8 py-6">
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
          plan === 'Pro' ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-slate-50 text-slate-500 border-slate-100"
        )}>
          {plan === 'Pro' ? <Zap className="h-3 w-3" /> : <Layers className="h-3 w-3" />}
          {plan}
        </div>
     </td>
     <td className="px-8 py-6">
        <div className="w-full max-w-[140px]">
           <div className="flex items-center justify-between text-[9px] uppercase font-bold text-slate-400 mb-1.5">
              <span>Quota Used</span>
              <span>{usage}%</span>
           </div>
           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000 shadow-sm",
                  usage > 80 ? "bg-rose-500" : usage > 50 ? "bg-purple-500" : "bg-emerald-500"
                )}
                style={{ width: `${usage}%` }}
              />
           </div>
        </div>
     </td>
     <td className="px-8 py-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">{date}</td>
     <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
           <button className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-100 hover:bg-purple-50 transition-all shadow-sm">
              <Mail className="h-3.5 w-3.5" />
           </button>
           <button className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all shadow-sm">
              <ShieldAlert className="h-3.5 w-3.5" />
           </button>
           <button className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-all shadow-sm">
              <MoreVertical className="h-3.5 w-3.5" />
           </button>
        </div>
     </td>
  </tr>
);

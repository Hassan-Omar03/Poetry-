import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Plus, 
  Minus, 
  History, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft,
  Users,
  Settings
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const AdminCredits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'rules'>('transactions');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Credit Economy</h1>
          <p className="text-sm text-slate-500 font-medium italic serif">Supervise transaction balances and algorithmic resource allocation.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex h-11 items-center gap-2 rounded-lg bg-indigo-600 px-6 text-[10px] uppercase tracking-widest font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              <Plus className="h-4 w-4" />
              Mass Quota Adjustment
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <StatsCard label="Circulating Credits" value="452,000" subValue="+12k this week" icon={<Plus className="text-emerald-600" />} />
         <StatsCard label="System Expenditure" value="381,241" subValue="+8k this week" icon={<Minus className="text-rose-600" />} />
         <StatsCard label="Mean Daily Drain" value="24.5" subValue="Stable" icon={<Users className="text-indigo-600" />} />
      </div>

      <div className="flex gap-4 border-b border-slate-100 pb-px">
         <TabButton active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')}>Historical Ledger</TabButton>
         <TabButton active={activeTab === 'rules'} onClick={() => setActiveTab('rules')}>Governance & Quotas</TabButton>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'transactions' ? (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >
             <div className="flex items-center justify-between mb-8">
                <div className="relative w-full max-w-md">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input 
                     placeholder="Search byproduct identity or ledger ID..." 
                     className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 text-xs font-medium text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-sm"
                   />
                </div>
                <button className="flex items-center gap-2 h-11 px-6 rounded-lg border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all shadow-sm">
                   <Filter className="h-4 w-4" />
                   Filter Logs
                </button>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                      <tr>
                         <th className="pb-4">Transaction ID</th>
                         <th className="pb-4">Identity</th>
                         <th className="pb-4">Activity</th>
                         <th className="pb-4">Delta</th>
                         <th className="pb-4">Verification</th>
                         <th className="pb-4 text-right">Chronology</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 text-xs">
                      {[1,2,3,4,5].map(i => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 font-mono text-[10px] text-slate-400 font-bold uppercase">TX-912{i}83</td>
                            <td className="py-4">
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-[10px] uppercase">{i}</div>
                                  <span className="font-bold text-slate-700">explorer_{i}@example.com</span>
                                </div>
                            </td>
                            <td className="py-4">
                               <span className={cn(
                                 "px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border",
                                 i % 2 === 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-indigo-50 text-indigo-600 border-indigo-100"
                               )}>
                                 {i % 2 === 0 ? 'Adjustment' : 'Analysis'}
                               </span>
                            </td>
                            <td className={cn("py-4 font-bold font-mono tracking-tighter", i % 2 === 0 ? "text-emerald-600" : "text-rose-600")}>
                               {i % 2 === 0 ? '+' : '-'}{i * 5}.00
                            </td>
                            <td className="py-4">
                               <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm" />
                                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Verified</span>
                                </div>
                            </td>
                            <td className="py-4 text-right text-slate-400 font-medium">{i}h ago</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </motion.div>
        ) : (
          <motion.div
            key="rules"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
             <RuleCard 
               title="Base Tier Quota" 
               description="Standard allowances for general explorers."
               settings={[
                 { label: 'Initial Grant', value: '20 Credits' },
                 { label: 'Recurrent Refill', value: '10 Credits' },
                 { label: 'Rollover Status', value: 'Inactive' },
               ]}
               icon={<Settings className="h-5 w-5 text-indigo-600" />}
             />
             <RuleCard 
               title="Scholar Tier Quota" 
               description="Intensive analytical capacity for pro users."
               settings={[
                 { label: 'Monthly Quota', value: '500 Credits' },
                 { label: 'Critical Analysis', value: '1 Credit' },
                 { label: 'Deep Exegesis', value: '5 Credits' },
               ]}
               icon={<BadgeCheck className="h-5 w-5 text-purple-600" />}
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { BadgeCheck } from 'lucide-react';

const StatsCard = ({ label, value, subValue, icon }: { label: string, value: string, subValue: string, icon: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex items-center justify-between group hover:bg-slate-50 transition-all">
     <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 leading-none">{label}</p>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <p className="text-[10px] font-bold text-indigo-600 mt-1 uppercase tracking-widest">{subValue}</p>
     </div>
     <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:scale-110 transition-all duration-300">
        {icon}
     </div>
  </div>
);

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all",
      active ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600"
    )}
  >
     {children}
  </button>
);

const RuleCard = ({ title, description, settings, icon }: { title: string, description: string, settings: { label: string, value: string }[], icon: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
     <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
           {icon}
        </div>
        <div>
           <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
           <p className="text-xs text-slate-500 font-medium italic serif leading-tight">{description}</p>
        </div>
     </div>
     <div className="space-y-3">
        {settings.map((s, i) => (
           <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">{s.label}</span>
              <span className="text-sm font-bold text-slate-800">{s.value}</span>
           </div>
        ))}
     </div>
     <button className="mt-8 w-full py-3 rounded-lg border border-slate-200 bg-white font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm">
        Modify Governance Rules
     </button>
  </div>
);

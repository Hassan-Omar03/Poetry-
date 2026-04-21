import React from 'react';
import { motion } from 'motion/react';
import { Clock, Search, Filter, BookOpen, ChevronRight, Hash, Trash2 } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const history = [
    { id: '1', title: 'The Road Not Taken', poet: 'Robert Frost', date: 'Mar 22, 2024', credits: 1 },
    { id: '2', title: 'I Wandered Lonely as a Cloud', poet: 'William Wordsworth', date: 'Mar 21, 2024', credits: 1 },
    { id: '3', title: 'Ozymandias', poet: 'Percy Bysshe Shelley', date: 'Mar 20, 2024', credits: 1 },
    { id: '4', title: 'Sonnet 18', poet: 'William Shakespeare', date: 'Mar 18, 2024', credits: 1 },
    { id: '5', title: 'The Raven', poet: 'Edgar Allan Poe', date: 'Mar 15, 2024', credits: 1 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-white">Analysis History</h1>
           <p className="text-slate-400">Revisit your previously analyzed poetic journeys.</p>
        </div>
        <div className="flex gap-4">
           <button className="h-11 px-4 rounded-xl border border-white/10 text-xs font-bold text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Clear History
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input 
               placeholder="Search internal history..." 
               className="w-full h-12 rounded-2xl bg-slate-900 border border-white/10 pl-12 pr-4 outline-none focus:border-indigo-500 transition-all font-medium"
            />
         </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/50 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-white/5 border-b border-white/10">
                  <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black">
                     <th className="px-8 py-5">Poem & Author</th>
                     <th className="px-8 py-5">Analyzed Date</th>
                     <th className="px-8 py-5">Credits Used</th>
                     <th className="px-8 py-5 text-right">View Analysis</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                                <BookOpen className="h-5 w-5" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-white hover:text-indigo-400 transition-colors cursor-pointer">{item.title}</p>
                                <p className="text-xs text-slate-500 font-medium italic mt-1">{item.poet}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-sm text-slate-400 font-medium">{item.date}</td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <Hash className="h-3 w-3 text-indigo-400" />
                             <span className="text-xs font-mono text-white">{item.credits}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <button className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 border border-transparent transition-all">
                             <ChevronRight className="h-5 w-5" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

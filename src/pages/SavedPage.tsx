import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Star, Trash2, ExternalLink, Filter, Grid, List as ListIcon } from 'lucide-react';

export const SavedPage: React.FC = () => {
  const savedItems = [
    { id: '1', title: 'The Waste Land', poet: 'T.S. Eliot', tags: ['Modernism', 'Epic'], rating: 5 },
    { id: '2', title: 'Ode on a Grecian Urn', poet: 'John Keats', tags: ['Romantic', 'Art'], rating: 4 },
    { id: '3', title: 'Ariel', poet: 'Sylvia Plath', tags: ['Confessional'], rating: 5 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-white">Curated Library</h1>
           <p className="text-slate-400">Your personal collection of masterpieces and insights.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
              <button className="p-2 rounded-lg bg-indigo-600 text-white shadow-lg"><Grid className="h-4 w-4" /></button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-white transition-all"><ListIcon className="h-4 w-4" /></button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {savedItems.map((item, i) => (
            <motion.div
               key={item.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="group rounded-[32px] border border-white/10 bg-slate-900/50 p-8 shadow-xl hover:border-indigo-500/30 transition-all flex flex-col items-start text-left relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-6 flex gap-2">
                  <button className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20">
                    <Bookmark className="h-4 w-4 fill-white" />
                  </button>
               </div>

               <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, starI) => (
                    <Star 
                       key={starI} 
                       className={cn(
                          "h-4 w-4", 
                          starI < item.rating ? "text-yellow-500 fill-yellow-500" : "text-white/10"
                       )} 
                    />
                  ))}
               </div>

               <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
               <p className="text-sm font-medium text-slate-500 italic mb-8">{item.poet}</p>

               <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                       {tag}
                    </span>
                  ))}
               </div>

               <button className="mt-auto w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-all border border-white/5 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
                  Launch Deep Analysis
                  <ExternalLink className="h-4 w-4" />
               </button>
            </motion.div>
         ))}
      </div>
    </div>
  );
};

import { cn } from '@/src/lib/utils';

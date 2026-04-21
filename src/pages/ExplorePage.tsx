import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, BookOpen, Clock, Star, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPoems = [
    { title: 'The Raven', author: 'Edgar Allan Poe', era: 'Romantic', length: 'Short', trending: true },
    { title: 'Ozymandias', author: 'Percy Bysshe Shelley', era: 'Romantic', length: 'Sonnet', trending: true },
    { title: 'The Waste Land', author: 'T.S. Eliot', era: 'Modernist', length: 'Long', trending: false },
    { title: 'Ariel', author: 'Sylvia Plath', era: 'Contemporary', length: 'Short', trending: true },
  ];

  const categories = ['All', 'Romance', 'Nature', 'Death', 'Philosophy', 'Politics', 'Spiritual'];

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[32px] bg-slate-900 px-6 py-20 text-center shadow-2xl">
         <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />
         <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
         
         <div className="relative z-10 container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 italic serif tracking-tight">Discover the Infinite Verse</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-12 font-medium leading-relaxed">Search through centuries of poetic masterpieces and unlock their hidden exegesis instantly.</p>
            
            <div className="relative max-w-2xl mx-auto">
               <div className="relative flex items-center group">
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, poet, or thematic element..." 
                    className="w-full h-16 bg-white border border-slate-700/50 rounded-2xl pl-16 pr-6 text-slate-900 font-medium outline-none shadow-2xl focus:ring-4 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400"
                  />
                  <Search className="absolute left-6 h-6 w-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <button className="absolute right-3 h-11 px-8 rounded-xl bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg">
                     Ascertain
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
         {categories.map((cat, i) => (
            <button key={i} className={cn(
               "px-6 py-2 rounded-full border text-[10px] uppercase font-bold tracking-widest transition-all shadow-sm",
               i === 0 
                 ? "bg-indigo-600 text-white border-indigo-700" 
                 : "bg-white text-slate-400 border-slate-200 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            )}>
               {cat}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {featuredPoems.map((poem, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4">
                  {poem.trending && (
                     <div className="p-2.5 rounded-lg bg-indigo-600 text-white shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                        <Star className="h-3.5 w-3.5 fill-white" />
                     </div>
                  )}
               </div>

               <div className="mb-6 h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-700 transition-all shadow-sm">
                  <BookOpen className="h-5 w-5" />
               </div>

               <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors serif italic tracking-tight">“{poem.title}”</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-8">{poem.author}</p>

               <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-400 tracking-tighter">
                     <Clock className="h-3.5 w-3.5" />
                     {poem.length}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md uppercase tracking-widest">{poem.era}</span>
               </div>
            </motion.div>
         ))}
      </div>

      <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center group cursor-pointer hover:border-indigo-400/50 hover:bg-slate-50/50 transition-all">
         <div className="h-16 w-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
            <Plus className="h-8 w-8 text-slate-400 group-hover:text-white" />
         </div>
         <h2 className="text-xl font-bold text-slate-800 tracking-tight">Seek specific exegesis?</h2>
         <p className="text-sm text-slate-500 mt-2 font-medium italic serif">Request an entry or facilitate a custom critical analysis.</p>
      </div>
    </div>
  );
};

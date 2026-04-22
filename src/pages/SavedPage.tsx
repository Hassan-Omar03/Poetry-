import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, Star, Trash2, ExternalLink, Grid, List as ListIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const SavedPage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const savedItems = [
    { id: '1', title: 'The Waste Land',       poet: 'T.S. Eliot',       tags: ['Modernism', 'Epic'],   rating: 5 },
    { id: '2', title: 'Ode on a Grecian Urn', poet: 'John Keats',        tags: ['Romantic', 'Art'],     rating: 4 },
    { id: '3', title: 'Ariel',                poet: 'Sylvia Plath',      tags: ['Confessional'],        rating: 5 },
  ];

  return (
    <div className="space-y-8 pb-12">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Curated Library</h1>
          <p className="text-slate-500 mt-1">Your personal collection of masterpieces and insights.</p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setView('grid')}
            className={cn('p-2 rounded-lg transition-all', view === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700')}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={cn('p-2 rounded-lg transition-all', view === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700')}
          >
            <ListIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className={cn(
        view === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
      )}>
        {savedItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl border border-indigo-100 bg-indigo-100 p-8 hover:border-indigo-200 hover:shadow-lg transition-all flex flex-col relative"
          >
            {/* action buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all">
                <Trash2 className="h-4 w-4" />
              </button>
              <button className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all">
                <Bookmark className="h-4 w-4 fill-white" />
              </button>
            </div>

            {/* stars */}
            <div className="mb-5 flex gap-0.5">
              {[...Array(5)].map((_, starI) => (
                <Star
                  key={starI}
                  className={cn('h-4 w-4', starI < item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200')}
                />
              ))}
            </div>

            <h3
              className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {item.title}
            </h3>
            <p className="text-sm font-medium text-slate-400 italic mb-6">{item.poet}</p>

            {/* tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                  {tag}
                </span>
              ))}
            </div>

            <button className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-all">
              Launch Deep Analysis
              <ExternalLink className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Clock, Star, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredPoems = [
    { title: 'The Raven',       author: 'Edgar Allan Poe',       era: 'Romantic',     length: 'Short',  trending: true  },
    { title: 'Ozymandias',      author: 'Percy Bysshe Shelley',  era: 'Romantic',     length: 'Sonnet', trending: true  },
    { title: 'The Waste Land',  author: 'T.S. Eliot',            era: 'Modernist',    length: 'Long',   trending: false },
    { title: 'Ariel',           author: 'Sylvia Plath',          era: 'Contemporary', length: 'Short',  trending: true  },
  ];

  const categories = ['All', 'Romance', 'Nature', 'Death', 'Philosophy', 'Politics', 'Spiritual'];

  return (
    <div className="space-y-10 pb-20">

      {/* ── Hero — soft pink surface, no dark bg ── */}
      <div className="rounded-[32px] bg-indigo-50 border border-indigo-100 px-6 py-16 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em] mb-3">Explore</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 italic tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Discover the Infinite Verse
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Search through centuries of poetic masterpieces and unlock their hidden exegesis instantly.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-5 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, poet, or thematic element..."
                className="w-full h-14 bg-white border border-indigo-100 rounded-2xl pl-14 pr-36 text-slate-800 font-medium outline-none focus:ring-2 focus:ring-indigo-200 transition-all placeholder:text-slate-400 shadow-sm"
              />
              <button className="absolute right-2 h-10 px-6 rounded-xl bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all">
                Ascertain
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category filter ── */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-5 py-2 rounded-full border text-[10px] uppercase font-bold tracking-widest transition-all whitespace-nowrap',
              activeCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-500 border-slate-200 hover:text-indigo-700 hover:border-indigo-300'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Poem Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredPoems.map((poem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl border border-indigo-100 bg-indigo-100 p-8 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4">
              {poem.trending && (
                <div className="p-2.5 rounded-lg bg-indigo-600 text-white rotate-12 group-hover:rotate-0 transition-transform">
                  <Star className="h-3.5 w-3.5 fill-white" />
                </div>
              )}
            </div>

            <div className="mb-6 h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-700 group-hover:text-white transition-all">
              <BookOpen className="h-5 w-5" />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-700 transition-colors italic tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              "{poem.title}"
            </h3>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-8">{poem.author}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <Clock className="h-3.5 w-3.5" />
                {poem.length}
              </div>
              <span className="text-[9px] font-black text-slate-500 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-widest">
                {poem.era}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Load more / custom analysis ── */}
      <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center group cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
        <div className="h-14 w-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-indigo-700 group-hover:text-white transition-all">
          <Plus className="h-7 w-7 text-slate-400 group-hover:text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Seek specific exegesis?</h2>
        <p className="text-sm text-slate-500 mt-2 font-medium italic">Request an entry or facilitate a custom critical analysis.</p>
      </div>
    </div>
  );
};

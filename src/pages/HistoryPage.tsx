import React from 'react';
import { motion } from 'motion/react';
import { Clock, Search, BookOpen, ChevronRight, Hash, Trash2 } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const history = [
    { id: '1', title: 'The Road Not Taken',            poet: 'Robert Frost',           date: 'Mar 22, 2024', credits: 1 },
    { id: '2', title: 'I Wandered Lonely as a Cloud',  poet: 'William Wordsworth',     date: 'Mar 21, 2024', credits: 1 },
    { id: '3', title: 'Ozymandias',                    poet: 'Percy Bysshe Shelley',   date: 'Mar 20, 2024', credits: 1 },
    { id: '4', title: 'Sonnet 18',                     poet: 'William Shakespeare',    date: 'Mar 18, 2024', credits: 1 },
    { id: '5', title: 'The Raven',                     poet: 'Edgar Allan Poe',        date: 'Mar 15, 2024', credits: 1 },
  ];

  return (
    <div className="space-y-8 pb-12">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Analysis History</h1>
          <p className="text-slate-500 mt-1">Revisit your previously analyzed poetic journeys.</p>
        </div>
        <button className="h-11 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all flex items-center gap-2 self-start">
          <Trash2 className="h-4 w-4" />
          Clear History
        </button>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          placeholder="Search analysis history..."
          className="w-full h-12 rounded-2xl bg-white border border-slate-200 pl-12 pr-4 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* ── Table ── */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-5">Poem &amp; Author</th>
                <th className="px-8 py-5">Analyzed Date</th>
                <th className="px-8 py-5">Credits Used</th>
                <th className="px-8 py-5 text-right">View Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="hover:bg-indigo-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-700 group-hover:text-white transition-all">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors cursor-pointer">{item.title}</p>
                        <p className="text-xs text-slate-400 font-medium italic mt-0.5">{item.poet}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                      <Clock className="h-3.5 w-3.5 text-slate-300" />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Hash className="h-3 w-3 text-orange-400" />
                      <span className="text-xs font-mono font-bold text-slate-700">{item.credits}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-all ml-auto">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, BookOpen, Languages, History as HistoryIcon,
  Search, MessageCircle, Hash, Info, BadgeCheck,
  ChevronDown, Bookmark, Share2, FileText, ExternalLink,
  BookMarked, Feather,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAppContext } from '@/src/context/AppContext';
import { explainPoetry, PoetryAnalysis } from '@/src/services/poetryService';
import { LANGUAGES } from '@/src/constants/languages';

export const AnalyzePage: React.FC = () => {
  const { user, consumeCredit, addBlog } = useAppContext();
  const [input, setInput]             = useState('');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis]       = useState<PoetryAnalysis | null>(null);
  const [error, setError]             = useState<string | null>(null);
  const [showFullExplanation, setShowFullExplanation] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    if (user && user.credits <= 0) {
      setError("You've run out of credits. Please upgrade your plan.");
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await explainPoetry(input, targetLanguage);
      setAnalysis(result);
      consumeCredit();
    } catch (err: any) {
      console.error('Analysis error:', err);
      const msg = err?.message ?? String(err);
      setError(`Analysis failed: ${msg.substring(0, 200)}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConvertToBlog = () => {
    if (!analysis) return;
    addBlog({
      title: `Deep Analysis: ${analysis.themes[0]} in Verse`,
      content: analysis.explanation,
      poet: analysis.poet.name,
      preview: analysis.explanation.substring(0, 150) + '...',
    });
    alert('Converted to blog post successfully!');
  };

  const renderPoemWithTooltips = (text: string) => {
    if (!analysis) return text;
    return text.split('\n').map((line, lineIdx) => (
      <div key={lineIdx} className="mb-1 min-h-[1.5rem]">
        {line.split(/(\s+)/).map((part, partIdx) => {
          const cleanWord = part.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
          const dictEntry = analysis.wordDictionary.find(d => d.word.toLowerCase() === cleanWord);
          if (dictEntry) {
            return (
              <span key={partIdx} className="group relative inline-block">
                <span className="cursor-help border-b-2 border-purple-400/50 hover:border-purple-400 hover:text-purple-600 transition-all font-bold">
                  {part}
                </span>
                <span className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-slate-900 p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-50 shadow-2xl border border-white/10 pointer-events-none">
                  <p className="font-bold text-purple-400 uppercase tracking-tighter mb-1">{dictEntry.word}</p>
                  <p className="text-slate-200">{dictEntry.meaning}</p>
                  {dictEntry.pronunciation && (
                    <p className="mt-1 text-[10px] text-slate-500 italic">[{dictEntry.pronunciation}]</p>
                  )}
                </span>
              </span>
            );
          }
          return <span key={partIdx}>{part}</span>;
        })}
      </div>
    ));
  };

  return (
    <div className="space-y-8 pb-12 px-4 md:px-8 lg:px-12 pt-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Poet's Studio</h1>
        <p className="text-sm text-slate-500 mt-1">Paste a poem, choose a language, and let AI uncover every layer of meaning.</p>
      </div>

      {/* Input Section */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all">
        <div className="absolute top-0 right-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-600/10 blur-[60px]" />

        <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-purple-600">
          <Sparkles className="h-4 w-4" />
          <span>New Analysis</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 relative">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a poem here, or enter a title..."
              className="w-full min-h-[160px] rounded-xl bg-slate-50 border border-slate-200 p-6 text-lg text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none serif italic"
            />
          </div>

          <div className="w-full md:w-64 space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Languages className="h-3 w-3" />
              Target Language
            </label>
            <div className="relative group">
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full h-14 rounded-xl bg-slate-50 border border-slate-200 pl-5 pr-10 text-sm font-bold text-slate-900 appearance-none focus:border-indigo-400 outline-none transition-all cursor-pointer"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !input.trim()}
              className="w-full h-14 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              ) : (
                <><Sparkles className="h-4 w-4" /> Analyze</>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-600 mb-1">⚠ Error</p>
            <p className="text-xs text-red-500 font-mono break-all">{error}</p>
            <p className="text-xs text-slate-400 mt-2">Check browser DevTools (F12 → Console) for full details.</p>
          </div>
        )}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {analysis ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ResultCard title="Original Poetry" icon={<Search className="h-4 w-4" />}>
                <div className="serif italic text-xl leading-relaxed text-slate-700 space-y-2">
                  {renderPoemWithTooltips(analysis.originalPoem)}
                </div>
                <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1 border-t border-slate-100 pt-4">
                  <Info className="h-3 w-3" /> Hover underlined words for insights
                </p>
              </ResultCard>

              <div className="flex flex-col gap-8">
                {analysis.translation && (
                  <ResultCard title="Translation" icon={<Languages className="h-4 w-4" />}>
                    <div className="serif italic text-lg leading-relaxed text-purple-600 whitespace-pre-wrap">
                      {analysis.translation}
                    </div>
                  </ResultCard>
                )}
                <ResultCard title="Explanation" icon={<Info className="h-4 w-4" />} variant="primary">
                  <div className={cn('text-slate-600 leading-relaxed text-sm italic', !showFullExplanation && 'line-clamp-4')}>
                    "{analysis.explanation}"
                  </div>
                  <button
                    onClick={() => setShowFullExplanation(!showFullExplanation)}
                    className="mt-4 flex items-center gap-1 text-purple-600 font-bold text-xs hover:underline uppercase tracking-wider"
                  >
                    {showFullExplanation ? 'Condense' : 'Expand Deep Dive'}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', showFullExplanation && 'rotate-180')} />
                  </button>
                </ResultCard>
              </div>
            </div>

            {/* Word Dictionary */}
            <ResultCard title="Word Dictionary" icon={<BookOpen className="h-4 w-4" />}>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100">
                      <th className="px-4 py-4">Word</th>
                      <th className="px-4 py-4">Meaning</th>
                      <th className="px-4 py-4">Translation</th>
                      <th className="px-4 py-4">Pronunciation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {analysis.wordDictionary.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4 font-bold text-purple-600">{item.word}</td>
                        <td className="px-4 py-4 text-xs text-slate-600">{item.meaning}</td>
                        <td className="px-4 py-4 text-xs text-slate-500">{item.translation || 'N/A'}</td>
                        <td className="px-4 py-4 text-xs font-mono text-slate-400">{item.pronunciation || '[N/A]'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ResultCard>

            {/* Poet & Context */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ResultCard title="Poet & Historical Context" icon={<HistoryIcon className="h-4 w-4" />} className="lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="h-48 w-48 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-lg relative group">
                    <img src={`https://picsum.photos/seed/${analysis.poet.name}/400/400`} alt={analysis.poet.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest bg-purple-600/80 px-2 py-0.5 rounded-md">{analysis.poet.era}</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">{analysis.poet.name}</h3>
                    <p className="text-slate-500 leading-relaxed italic serif">"{analysis.poet.bio}"</p>
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Artistic Intent & Form</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{analysis.poet.whyForm}</p>
                    </div>
                    {analysis.poet.wikipediaLink && (
                      <a href={analysis.poet.wikipediaLink} target="_blank" rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-50 px-5 py-2 text-xs font-bold text-slate-500 border border-slate-200 hover:bg-indigo-50 hover:text-purple-600 hover:border-indigo-200 transition-all">
                        Explore Biography <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </ResultCard>

              <div className="flex flex-col gap-8">
                <ResultCard title="Themes & Devices" icon={<Hash className="h-4 w-4" />}>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Key Themes</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {analysis.themes.map((theme) => (
                      <span key={theme} className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-widest border border-purple-200">
                        {theme}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Literary Devices</h4>
                  <div className="space-y-3">
                    {analysis.literaryDevices.map((device, i) => (
                      <div key={i} className="p-3 rounded-xl border border-slate-100 hover:border-purple-100 hover:bg-purple-50/30 transition-colors">
                        <p className="text-sm font-bold text-slate-800 flex items-center justify-between">
                          {device.device}
                          <BadgeCheck className="h-3 w-3 text-purple-500" />
                        </p>
                        <p className="text-xs text-slate-500 italic mt-1 serif">"{device.example}"</p>
                      </div>
                    ))}
                  </div>
                </ResultCard>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex flex-wrap gap-4 items-center justify-start pt-8 border-t border-slate-100">
              <button onClick={handleConvertToBlog}
                className="flex h-12 items-center gap-2 rounded-2xl bg-purple-600 px-8 font-bold text-white hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-200">
                <FileText className="h-5 w-5" /> Convert to Blog Post
              </button>
              <button className="flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 font-bold text-slate-700 hover:bg-slate-100 transition-all">
                <Bookmark className="h-5 w-5" /> Save to Library
              </button>
              <button className="flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 font-bold text-slate-700 hover:bg-slate-100 transition-all">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-8 border-purple-100 border-t-purple-600 animate-spin" />
              <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-purple-500 animate-pulse" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-10 mb-2">Deciphering the Verse...</h2>
            <p className="text-slate-500 max-w-md text-center">Consulting literary databases and linguistic archives to unlock the poem's soul.</p>
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="h-40 w-40 rounded-[40px] bg-purple-50 border border-purple-100 flex items-center justify-center mb-10 rotate-6 shadow-xl relative">
              <BookMarked className="h-16 w-16 text-purple-300" />
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center rotate-[-12deg] shadow-lg">
                <Feather className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Your studio awaits</h2>
            <p className="text-slate-500 max-w-lg mb-10">Paste a classic sonnet, a modern haiku, or an ancient epic. Our AI models are trained to find the meaning in every stanza.</p>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              <div className="h-1 w-12 bg-slate-200 rounded-full" />
              Start your analysis above
              <div className="h-1 w-12 bg-slate-200 rounded-full" />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Result Card ──────────────────────────────────────────── */
const ResultCard = ({ title, icon, children, variant = 'default', className }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; variant?: 'default' | 'primary'; className?: string;
}) => (
  <div className={cn(
    'rounded-2xl border transition-all shadow-sm',
    variant === 'primary' ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200',
    className
  )}>
    <div className="flex items-center justify-between p-5 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</h2>
      </div>
      <div className="flex gap-1">
        <button className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-700 transition-all"><Bookmark className="h-4 w-4" /></button>
        <button className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-700 transition-all"><Share2 className="h-4 w-4" /></button>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

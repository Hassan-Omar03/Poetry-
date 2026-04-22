import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Search, Tag, User } from 'lucide-react';

const BLOG1_IMG = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const BLOG2_IMG = "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const BLOG3_IMG = "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const AI_IMG   = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

const BLOGS = [
  { id: '1', img: BLOG1_IMG, title: "The Hidden Grief in Keats' Ode to a Nightingale", poet: 'John Keats',        tag: 'Romanticism',  readTime: '8 min',  preview: "Explore how Keats uses the nightingale as a symbol of escape from the pains of human consciousness and the inevitability of death. The ode moves through complex emotional states...", featured: true },
  { id: '2', img: BLOG2_IMG, title: "Wordsworth's Nature: Beyond Simple Beauty",          poet: 'William Wordsworth', tag: 'Nature Poetry', readTime: '6 min',  preview: "In Tintern Abbey, Wordsworth does more than celebrate nature — he explores memory, time, and spiritual growth. The poem reveals how revisiting a place triggers profound meditation..." },
  { id: '3', img: BLOG3_IMG, title: "Pablo Neruda's Love Sonnets Decoded",                poet: 'Pablo Neruda',       tag: 'Love Poetry',  readTime: '7 min',  preview: "Neruda's Sonnet XVII reveals layers of longing and connection through unexpected comparisons. His use of negative imagery — 'I love you as certain dark things' — paradoxically..." },
  { id: '4', img: AI_IMG,    title: "AI and Poetry: A New Way to Read Ancient Verse",     poet: 'Editorial Team',     tag: 'Technology',   readTime: '5 min',  preview: "How artificial intelligence is changing the way we read, analyze, and appreciate poetry. From Homeric epics to contemporary verse, AI tools are unlocking new layers of meaning..." },
  { id: '5', img: BLOG1_IMG, title: "Emily Dickinson's Dashes: Punctuation as Poetry",   poet: 'Emily Dickinson',    tag: 'Analysis',     readTime: '9 min',  preview: "Dickinson's unconventional use of dashes creates rhythmic pauses that function like musical rests. Each dash introduces ambiguity, expanding the reader's interpretive space..." },
  { id: '6', img: BLOG2_IMG, title: "Rumi's Masnavi: A Spiritual Ocean of Verse",         poet: 'Jalal ad-Din Rumi',  tag: 'Sufi Poetry',  readTime: '10 min', preview: "The Masnavi is not simply a collection of poems — it is a complete spiritual guide. Rumi weaves together allegory, metaphor, and mystical insight across 25,000 verses..." },
];

const TAGS = ['All', 'Romanticism', 'Love Poetry', 'Nature Poetry', 'Analysis', 'Technology', 'Sufi Poetry', 'Modern Verse'];

export const BlogsPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [query, setQuery] = useState('');

  const featured = BLOGS.find(b => b.featured)!;
  const rest = BLOGS.filter(b => !b.featured).filter(b => {
    const tagOk   = activeTag === 'All' || b.tag === activeTag;
    const queryOk = query === '' || b.title.toLowerCase().includes(query.toLowerCase()) || b.poet.toLowerCase().includes(query.toLowerCase());
    return tagOk && queryOk;
  });

  return (
    <div className="bg-white min-h-screen">

      <section className="bg-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-slate-500 font-medium">Poetry Insights &amp; Analysis</span>
          </div>
          <h1 className="text-slate-900 mb-5 font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            The PoetryExplainer Blog
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed text-lg">
            Deep dives into classic and contemporary poetry — literary analysis, poet biographies, and AI-powered insights.
          </p>
          <div className="max-w-md mx-auto flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-indigo-100 shadow-sm">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search poems, poets, themes..."
              className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent"
            />
            <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs rounded-lg font-semibold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Tag Filter ── */}
      <div className="bg-white border-b border-slate-100 py-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-all font-medium ${
                activeTag === tag
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700 bg-white'
              }`}
            >
              {tag !== 'All' && <Tag className="w-3 h-3" />}
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* ── Featured Post ── */}
        <div className="mb-20">
          <p className="text-xs text-indigo-600 mb-5 uppercase tracking-widest font-bold">✦ Featured Post</p>
          <div className="group flex flex-col lg:flex-row bg-indigo-100 rounded-3xl overflow-hidden border border-indigo-100 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="lg:w-1/2 h-72 lg:h-auto overflow-hidden">
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 font-semibold">{featured.tag}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <Clock className="w-3 h-3" />{featured.readTime} read
                </span>
              </div>
              <h2 className="text-slate-900 mb-5 group-hover:text-indigo-700 transition-colors font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.9rem', lineHeight: 1.3 }}>
                {featured.title}
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">{featured.preview}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-700 font-semibold">{featured.poet}</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                  Read Analysis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Blog Grid ── */}
        <div>
          <p className="text-xs text-slate-400 mb-8 uppercase tracking-widest font-bold">All Posts · {rest.length} articles</p>
          {rest.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No articles matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((blog) => (
                <div
                  key={blog.id}
                  className="group bg-indigo-100 rounded-2xl overflow-hidden border border-indigo-100 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="h-52 overflow-hidden">
                    <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 font-semibold">{blog.tag}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <Clock className="w-3 h-3" />{blog.readTime}
                      </span>
                    </div>
                    <h3 className="text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors font-bold leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.1rem', lineHeight: 1.4 }}>
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-5 leading-relaxed line-clamp-3">{blog.preview}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{blog.poet}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Load More ── */}
        <div className="text-center mt-16">
          <button className="px-10 py-4 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all text-sm font-semibold">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

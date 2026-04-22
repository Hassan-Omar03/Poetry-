import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Sparkles, Globe, BookOpen, MessageSquare,
  BadgeCheck, Info, Hash, Clock, User as UserIcon,
  ChevronDown, Plus, Minus,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────── */
const LANG_PILLS = ['Urdu', 'English', 'Spanish', 'Hindi', 'Arabic', 'Tamil', 'Swahili'];

const LANGUAGES = [
  { name:'Urdu',       native:'اردو',            poets:'Ghalib · Iqbal · Faiz' },
  { name:'Arabic',     native:'العربية',          poets:'Darwish · Qabbani · al-Mutanabbi' },
  { name:'English',    native:'English',           poets:'Shakespeare · Frost · Dickinson' },
  { name:'Spanish',    native:'Español',           poets:'Neruda · Lorca · Borges' },
  { name:'Persian',    native:'فارسی',             poets:'Rumi · Hafez · Khayyam' },
  { name:'Hindi',      native:'हिन्दी',            poets:'Kabir · Tulsidas · Harivansh Rai' },
  { name:'Tamil',      native:'தமிழ்',             poets:'Bharathiar · Sangam Poetry' },
  { name:'Bengali',    native:'বাংলা',             poets:'Tagore · Nazrul · Jibanananda' },
  { name:'Turkish',    native:'Türkçe',            poets:'Nazim Hikmet · Yunus Emre' },
  { name:'French',     native:'Français',          poets:'Baudelaire · Rimbaud · Hugo' },
  { name:'German',     native:'Deutsch',           poets:'Goethe · Rilke · Heine' },
  { name:'Italian',    native:'Italiano',          poets:'Dante · Petrarch · Leopardi' },
  { name:'Portuguese', native:'Português',         poets:'Pessoa · Camões · Drummond' },
  { name:'Russian',    native:'Русский',           poets:'Pushkin · Akhmatova · Mayakovsky' },
  { name:'Japanese',   native:'日本語',             poets:'Basho · Yosa Buson · Issa' },
  { name:'Chinese',    native:'中文',              poets:'Li Bai · Du Fu · Wang Wei' },
  { name:'Korean',     native:'한국어',             poets:'Yun Dong-ju · So Wol · Han Yong-un' },
  { name:'Swahili',    native:'Kiswahili',         poets:'Shaaban Robert · Euphrase Kezilahabi' },
  { name:'Punjabi',    native:'ਪੰਜਾਬੀ',            poets:'Bulleh Shah · Waris Shah · Amrita Pritam' },
  { name:'Pashto',     native:'پښتو',              poets:'Khushal Khan Khattak · Rahman Baba' },
  { name:'Greek',      native:'Ελληνικά',          poets:'Homer · Sappho · Cavafy' },
  { name:'Hebrew',     native:'עברית',             poets:'Yehuda Amichai · Bialik · Leah Goldberg' },
  { name:'Telugu',     native:'తెలుగు',            poets:'Vemana · Sri Sri · Gurajada' },
  { name:'Malayalam',  native:'മലയാളം',            poets:'Kumaran Asan · Changampuzha' },
  { name:'Thai',       native:'ไทย',               poets:'Sunthorn Phu · Angkhan Kalayanapong' },
  { name:'Vietnamese', native:'Tiếng Việt',        poets:'Nguyễn Du · Hồ Xuân Hương' },
  { name:'Polish',     native:'Polski',            poets:'Szymborska · Miłosz · Herbert' },
  { name:'Dutch',      native:'Nederlands',        poets:'Vondel · Nijhoff · Lucebert' },
  { name:'Indonesian', native:'Bahasa Indonesia',  poets:'Chairil Anwar · Sapardi Djoko' },
  { name:'Romanian',   native:'Română',            poets:'Eminescu · Nichita Stănescu' },
];

const FEATURES = [
  { icon:<Globe className="h-6 w-6"/>, color:'purple', title:'180+ Language Support',       description:'Translate and understand poetry from over 180 languages — from classical Arabic to modern Japanese — with neural precision.' },
  { icon:<Info className="h-6 w-6"/>,  color:'violet', title:'Logical Explanations',        description:'Complex verses simplified into readable, context-aware insights for all levels — from student to scholar.' },
  { icon:<Hash className="h-6 w-6"/>,  color:'purple', title:'Literary Device Detection',   description:'Instantly identify metaphors, sonnets, alliteration, anaphora, and deeper structural motifs.' },
  { icon:<MessageSquare className="h-6 w-6"/>, color:'violet', title:'Scholarly AI Chat',    description:'Dig deeper into any verse with our conversational Poetry Intelligence assistant — ask anything, get scholarly answers.' },
  { icon:<BookOpen className="h-6 w-6"/>, color:'purple', title:'Global Word Dictionary',   description:'Get definitions, pronunciations, etymologies, and historical context for every significant word in the poem.' },
  { icon:<BadgeCheck className="h-6 w-6"/>, color:'violet', title:'Personal Digital Archive', description:'Build your personal library of analyzed poetry and access it anywhere, anytime. Save, organize, and revisit.' },
];

const BLOG_IMGS = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
];
const BLOG_PREVIEW = [
  { id:'1', img:BLOG_IMGS[0], title:"The Hidden Grief in Keats' Ode to a Nightingale", poet:'John Keats',        tag:'Romanticism',  readTime:'8 min',  preview:"Explore how Keats uses the nightingale as a symbol of escape from the pains of human consciousness." },
  { id:'2', img:BLOG_IMGS[1], title:"Wordsworth's Nature: Beyond Simple Beauty",        poet:'William Wordsworth',tag:'Nature Poetry', readTime:'6 min',  preview:"In Tintern Abbey, Wordsworth explores memory, time, and spiritual growth through a return to nature." },
  { id:'3', img:BLOG_IMGS[2], title:"AI and Poetry: A New Way to Read Ancient Verse",   poet:'Editorial Team',    tag:'Technology',   readTime:'5 min',  preview:"How artificial intelligence is changing the way we read, analyze, and appreciate poetry across centuries." },
];

const FAQS = [
  { q:'How do I analyze a poem?',                               a:'Simply paste any poem into the text box on the Dashboard and click Analyze. Our AI reads the poem, identifies the poet, themes, literary devices, and gives you a full breakdown in seconds.' },
  { q:'What literary devices does it detect?',                  a:'Poetry Explainer detects similes, metaphors, personification, alliteration, assonance, anaphora, enjambment, irony, hyperbole, symbolism, imagery, and many more — with examples from the poem itself.' },
  { q:'Can I translate Urdu poetry to English?',                a:'Yes! Select "English" as your output language, paste Urdu verse (in either Nastaliq script or romanized form), and you will receive a full translation plus analysis in English.' },
  { q:'What types of poems can I analyze?',                     a:'Everything — sonnets, ghazals, haiku, free verse, odes, ballads, epic poetry, nursery rhymes, and contemporary slam poetry. If it has words, we can analyze it.' },
  { q:'Is Poetry Explainer free?',                              a:"Yes — you start with 20 free analysis credits. The free plan gives you full access to the core analysis engine. Upgrade to Scholar Master for unlimited analyses and priority AI access." },
  { q:'How is this different from ChatGPT for poem analysis?',  a:'Unlike a general chatbot, Poetry Explainer is purpose-built for poetry. It returns structured data — poet bio, themes list, device-by-device breakdown, word dictionary — not a freeform paragraph. It also works offline via a local fallback engine.' },
];

/* ────────────────────────────────────────────────────────────
   COMPONENT
──────────────────────────────────────────────────────────── */
export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden bg-[#F8FAFC]">

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center px-6 md:px-12 lg:px-24 py-28 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 overflow-hidden">
        {/* glowing orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-purple-500/20 blur-[160px]" />
          <div className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 h-[300px] w-[300px] rounded-full bg-indigo-400/15 blur-[80px]" />
        </div>

        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left ── */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7 }}>
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-200 shadow-sm mb-8">
              <Sparkles className="h-3 w-3" />
              Poetry Meets AI
            </div>

            {/* headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Read a poem.<br />
              Understand it deeply.
            </h1>

            {/* sub */}
            <p className="text-lg text-purple-200 leading-relaxed max-w-lg mb-10">
              Paste a verse in{' '}
              <span className="font-semibold text-white">any language</span>{' '}
              — Urdu, Arabic, Swahili, Tamil, and more — and get an explanation in 180+ languages.
              AI uncovers the poet, the meaning, and the story behind every line.
            </p>

            {/* buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/signup"
                className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-purple-900 shadow-xl shadow-black/20 hover:bg-purple-50 hover:scale-[1.02] transition-all active:scale-95"
              >
                Try it free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior:'smooth' })}
                className="inline-flex items-center gap-1.5 py-4 text-purple-200 font-medium hover:text-white transition-colors text-sm"
              >
                How does it work?
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* lang pills */}
            <div className="flex flex-wrap gap-2">
              {LANG_PILLS.map(l => (
                <span key={l} className="rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-purple-100 shadow-sm">
                  {l}
                </span>
              ))}
              <span className="rounded-full border border-purple-400/40 bg-purple-500/20 px-4 py-1.5 text-xs font-semibold text-purple-200">
                180+ more
              </span>
            </div>
          </motion.div>

          {/* ── Right — Demo card ── */}
          <motion.div
            initial={{ opacity:0, x:30, scale:0.97 }}
            animate={{ opacity:1, x:0, scale:1 }}
            transition={{ duration:0.7, delay:0.15 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden">
              {/* titlebar */}
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-[11px] font-semibold text-purple-200">Poetry Explainer</span>
              </div>
              <div className="p-8">
                <p className="text-white text-xl leading-relaxed mb-1" style={{ fontFamily:"'Playfair Display',Georgia,serif" }}>
                  Shall I compare thee to a summer's day?
                </p>
                <p className="text-white text-xl leading-relaxed mb-6" style={{ fontFamily:"'Playfair Display',Georgia,serif" }}>
                  Thou art more lovely and more temperate.
                </p>
                {/* divider */}
                <div className="h-px bg-gradient-to-r from-purple-400/40 via-violet-400/40 to-transparent mb-6" />
                {/* tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['William Shakespeare','Sonnet','Elizabethan'].map(t => (
                    <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-purple-100">
                      {t}
                    </span>
                  ))}
                </div>
                {/* ai output */}
                <p className="text-sm text-purple-200 leading-relaxed italic" style={{ fontFamily:"'Playfair Display',Georgia,serif" }}>
                  "Should I compare you to a summer day? You are more beautiful and more even-tempered."
                </p>
              </div>
            </div>

            {/* floating accents */}
            <div className="pointer-events-none absolute -top-4 -right-4 text-3xl select-none">🪶</div>
            <div className="pointer-events-none absolute -bottom-4 -left-4 text-2xl select-none">⭐</div>
            <div className="pointer-events-none absolute top-1/2 -left-8 text-2xl select-none opacity-60">❤️</div>
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══════════════════════════════════ */}
      <section id="how-it-works" className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
              style={{ fontFamily:"'Playfair Display',Georgia,serif" }}>
              How It Works
            </h2>
            <p className="text-slate-500 text-lg font-medium">From poem to full analysis in under 10 seconds.</p>
          </motion.div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-purple-200 via-violet-300 to-purple-200" />

            {[
              { n:'01', title:'Paste Your Poem',  desc:"Enter any poem — Shakespeare, Neruda, Rumi, or modern verse." },
              { n:'02', title:'AI Analyzes It',    desc:"Our GPT-4 powered engine processes the text in seconds." },
              { n:'03', title:'Explore Insights',  desc:"View translation, explanation, themes, devices, and more." },
              { n:'04', title:'Chat & Learn',      desc:"Ask follow-up questions and dive deeper into understanding." },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center px-4"
              >
                {/* number tile */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white font-black text-lg shadow-xl shadow-violet-300/40">
                  {step.n}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[180px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEE IT IN ACTION ═══════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.3em]">Live Demo</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              See It In Action
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Watch how PoetryExplainer transforms a poem into a full analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm"
          >
            {/* ── Left: Input ── */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* titlebar */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Input</span>
              </div>
              <div className="p-8">
                <p className="italic text-slate-700 text-lg leading-relaxed mb-6" style={{ fontFamily:"'Playfair Display',Georgia,serif" }}>
                  "Do not go gentle into that good night,<br />
                  Old age should burn and rave at close of day;<br />
                  Rage, rage against the dying of the light."
                </p>
                <p className="text-purple-600 text-sm font-semibold mb-8">— Dylan Thomas</p>
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-4 font-bold text-white text-sm hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 hover:scale-[1.01]">
                  <Sparkles className="h-4 w-4" />
                  Explain This Poem
                </button>
              </div>
            </div>

            {/* ── Right: Output ── */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                <span className="ml-2 text-[10px] font-bold text-purple-500 uppercase tracking-widest">AI Analysis Output</span>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { dot:'bg-slate-700',  label:'Core Theme',        value:'Resistance to death; the value of life\'s passion and fire.' },
                  { dot:'bg-purple-500', label:'Rhyme Scheme',       value:'Villanelle — ABA ABA ABA ABA ABA ABAA' },
                  { dot:'bg-amber-500',  label:'Literary Devices',   value:'Repetition, metaphor (dying of the light = death), apostrophe' },
                  { dot:'bg-green-500',  label:'Translation',        value:'"No cedas sin luchar a esa oscura noche tranquila..."' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50/50 px-5 py-4 hover:border-purple-100 hover:bg-purple-50/20 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`h-2 w-2 rounded-full ${item.dot}`} />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PICK YOUR LANGUAGE ═════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="mb-16 max-w-2xl"
          >
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.3em]">180+ Languages</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Pick your language
            </h2>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Poetry Explainer translates and analyzes poetry in 180+ languages.
              Every tile is a doorway into a literary tradition.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {LANGUAGES.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.03 }}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:border-purple-200 hover:bg-white hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{lang.name}</div>
                <div className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-purple-600 transition-colors">
                  {lang.native}
                </div>
                <div className="text-[10px] text-slate-400 leading-relaxed font-medium line-clamp-2">
                  {lang.poets}
                </div>
              </motion.div>
            ))}

            {/* +150 more tile */}
            <motion.div
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay: LANGUAGES.length * 0.03 }}
              className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-4 flex flex-col items-center justify-center text-center hover:bg-purple-50 transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-2">🌐</div>
              <div className="text-sm font-bold text-purple-600 group-hover:text-purple-700">150+ more</div>
              <div className="text-[10px] text-slate-400 mt-1">Every language with a poetic tradition</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══════════════════════════════════════ */}
      <section id="features" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-purple-50/20 to-[#F8FAFC] -z-10" />
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-20"
          >
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.3em]">What You Get</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Powerful Scholarly Tools</h2>
            <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Everything you need to master poetic interpretation in one unified, balanced platform.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i*0.08 }}
              >
                <FeatureCard {...f} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG PREVIEW ═══════════════════════════════════ */}
      <section className="py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.3em]">Literary Journal</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Fresh Insights from the Verse
            </h2>
            <p className="text-slate-500 mt-4 text-lg">Curated deep-dives written by our community of scholars.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_PREVIEW.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i*0.1 }}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full font-semibold">{blog.tag}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-medium"><Clock className="w-3 h-3"/>{blog.readTime}</span>
                  </div>
                  <h3 className="text-slate-900 font-bold mb-3 group-hover:text-purple-600 transition-colors leading-snug" style={{ fontSize:'1.05rem' }}>
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{blog.preview}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center">
                        <UserIcon className="w-3 h-3 text-white"/>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{blog.poet}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-purple-600 font-semibold group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3 h-3"/>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/blogs" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 text-sm hover:border-purple-200 hover:text-purple-600 hover:shadow-md transition-all">
              View All Articles <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.3em]">FAQ</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i*0.06 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq===i ? 'border-purple-200 bg-white shadow-lg shadow-purple-500/5' : 'border-slate-200 bg-white hover:border-purple-100 hover:shadow-md'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900 text-base pr-4">{faq.q}</span>
                  <div className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq===i ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {openFaq===i ? <Minus className="h-3.5 w-3.5"/> : <Plus className="h-3.5 w-3.5"/>}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq===i && (
                    <motion.div
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.25 }}
                    >
                      <div className="px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 px-8 py-20 text-center shadow-2xl shadow-purple-900/40 md:px-16 md:py-28">
            {/* glowing orbs */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-indigo-400/10 blur-[80px]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-[0.3em]">Get Started</span>
              <h2 className="mt-3 text-4xl font-bold text-white md:text-6xl leading-tight tracking-tight">
                Ready to illuminate the verse?
              </h2>
              <p className="mt-6 text-lg text-purple-200 font-medium leading-relaxed max-w-xl mx-auto">
                Join literature enthusiasts exploring the depths of poetry with scholarly precision — in any language.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup" className="flex h-14 items-center justify-center rounded-xl bg-white px-10 font-bold text-purple-900 hover:bg-purple-50 hover:scale-[1.02] shadow-xl shadow-black/20 transition-all text-base">
                  Try it for Free
                </Link>
                <Link to="/pricing" className="flex h-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-10 font-bold text-white hover:bg-white/20 transition-all text-base">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ── Feature Card ──────────────────────────────────────────── */
const COLOR_MAP: Record<string,{bg:string;text:string}> = {
  purple:{ bg:'bg-purple-50', text:'text-purple-600' },
  violet:{ bg:'bg-violet-50', text:'text-violet-600' },
};
const FeatureCard = ({ icon, color, title, description, index }:{ icon:React.ReactNode; color:string; title:string; description:string; index:number }) => {
  const c = COLOR_MAP[color];
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-purple-50/0 group-hover:bg-purple-50/70 blur-2xl transition-all duration-500" />
      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${c.bg} ${c.text} transition-all group-hover:scale-110 group-hover:shadow-lg`}>
        {icon}
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-black text-slate-200 group-hover:text-purple-200 transition-colors tracking-widest">
        {String(index+1).padStart(2,'0')}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
      <div className={`mt-6 h-0.5 w-10 rounded-full ${c.bg.replace('50','200')} group-hover:w-16 transition-all duration-300`} />
    </div>
  );
};

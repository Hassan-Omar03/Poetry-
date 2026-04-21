import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  BookOpen, 
  MessageSquare, 
  BadgeCheck,
  Play,
  Info,
  Hash
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 pb-32 text-center md:pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-100/50 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 shadow-sm">
            <Sparkles className="h-3 w-3" />
            <span>Modern Literary Intelligence</span>
          </div>
          
          <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 md:text-7xl lg:text-8xl max-w-5xl mx-auto">
            Understand Any Poem <br />
            <span className="text-indigo-600 italic serif">With Geometric Balance</span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-500 md:text-xl font-medium leading-relaxed">
            Shatter the barriers of time and translation. Get deep literary analysis, 
            cultural context, and line-by-line explanations in seconds.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="group relative flex h-14 items-center justify-center gap-2 rounded-lg gradient-bg px-10 font-bold text-white transition-all shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95"
            >
              Start Decoding Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex h-14 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-10 font-bold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              <Play className="h-4 w-4 fill-slate-600 text-slate-600" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Demo Section */}
        <section id="demo" className="mt-24 w-full max-w-5xl px-4">
            <div className="text-center mb-10">
               <h2 className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] mb-3">Live Experience</h2>
               <p className="text-slate-400 font-medium">From classic stanzas to deep insights in seconds.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-2 shadow-2xl md:p-4 rounded-2xl"
            >
          <div className="overflow-hidden rounded-xl bg-white border border-slate-200">
             <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Poetry Intelligence Engine</div>
                <div className="w-12" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="border-r border-slate-100 p-8 text-left">
                   <div className="mb-6 text-[10px] font-bold uppercase tracking-widest text-indigo-600">Raw Verse Input</div>
                   <div className="serif italic text-xl text-slate-800 leading-relaxed space-y-2">
                     <p>"I wandered lonely as a cloud</p>
                     <p>That floats on high o'er vales and hills,"</p>
                     <p>When all at once I saw a crowd,"</p>
                     <p>A host, of golden daffodils..."</p>
                   </div>
                </div>
                <div className="p-8 text-left bg-indigo-50/30">
                   <div className="mb-6 text-[10px] font-bold uppercase tracking-widest text-purple-600 text-right">Geometric Analysis</div>
                   <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-indigo-100 shadow-sm">
                         <BadgeCheck className="mt-0.5 h-5 w-5 text-indigo-600 shrink-0" />
                         <div>
                            <p className="text-xs font-bold text-slate-800 uppercase tracking-tight mb-1">Central Theme</p>
                            <p className="text-sm text-slate-500 leading-relaxed italic serif">Unity with nature and the sublime effect of sensory memory.</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-indigo-100 shadow-sm">
                         <BadgeCheck className="mt-0.5 h-5 w-5 text-indigo-600 shrink-0" />
                         <div>
                            <p className="text-xs font-bold text-slate-800 uppercase tracking-tight mb-1">Technique Found</p>
                            <p className="text-sm text-slate-500 leading-relaxed italic serif">Classic Simile used to establish the speaker's emotional state.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-slate-900 md:text-6xl tracking-tight">Powerful Scholarly Tools</h2>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">Everything you need to master poetic interpretation in one unified, balanced platform.</p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 px-4">
             <FeatureCard 
               icon={<Globe className="h-6 w-6 text-indigo-600" />}
               title="Language Translation" 
               description="Understand and translate poetry from over 180+ languages with neural precision."
             />
             <FeatureCard 
               icon={<Info className="h-6 w-6 text-purple-600" />}
               title="Logical Explanations" 
               description="Complex verses simplified into readable, context-aware insights for all levels."
             />
             <FeatureCard 
               icon={<Hash className="h-6 w-6 text-indigo-600" />}
               title="Device Detection" 
               description="Identify metaphors, sonnets, alliteration, and deeper motifs instantly."
             />
             <FeatureCard 
               icon={<MessageSquare className="h-6 w-6 text-purple-600" />}
               title="Scholarly AI Chat" 
               description="Dig deeper into the verse with our conversational Poetry Intelligence bot."
             />
             <FeatureCard 
               icon={<BookOpen className="h-6 w-6 text-indigo-600" />}
               title="Global Dictionary" 
               description="Get definitions, pronunciations, and historical context for every word."
             />
             <FeatureCard 
               icon={<BadgeCheck className="h-6 w-6 text-purple-600" />}
               title="Digital Archive" 
               description="Build your personal library of analyzed poetry and access it anywhere."
             />
          </div>
        </div>
      </section>

      {/* Steps/How It Works */}
      <section id="how-it-works" className="py-32 bg-slate-50 border-y border-slate-200">
         <div className="container mx-auto px-4">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-bold text-slate-900 md:text-5xl tracking-tight">Mastery in Perfect Balance</h2>
               <p className="text-slate-500 mt-4 font-medium italic serif">The journey from curiosity to understanding is seamless.</p>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-12">
               <Step number={1} title="Digitize" description="Paste any verse or enter a poem title." />
               <Step number={2} title="Dissect" description="AI models dismantle hidden layers." />
               <Step number={3} title="Illuminate" description="Receive full structured insights." />
               <Step number={4} title="Converse" description="Chat with the engine for specifics." />
               <Step number={5} title="Archive" description="Save or publish your discoveries." />
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
           <div className="relative overflow-hidden rounded-[40px] gradient-bg px-8 py-20 text-center shadow-2xl md:px-16 md:py-32">
              <div className="absolute top-0 right-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-[600px] w-[600px] translate-y-1/2 -translate-x-1/2 rounded-full bg-indigo-900/20 blur-[100px]" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-white md:text-7xl leading-tight">Ready to illuminate <br/> the verse?</h2>
                <p className="mt-8 text-xl text-indigo-100 font-medium leading-relaxed">
                  Join literature enthusiasts exploring the depths of poetry with scholarly precision.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                   <Link to="/signup" className="flex h-16 items-center justify-center rounded-xl bg-white px-12 font-bold text-indigo-600 transition-all hover:scale-[1.05] shadow-xl">
                      Start Your Studio Free
                   </Link>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const Step = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <div className="relative flex flex-col items-center text-center group">
     <div className="h-14 w-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl font-bold text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
        {number}
     </div>
     <h3 className="text-sm font-bold text-slate-800 mb-2 uppercase tracking-widest">{title}</h3>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white p-10 transition-all hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden">
    <div className="mb-8 inline-flex items-center justify-center rounded-xl bg-slate-50 p-4 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all group-hover:-translate-y-1">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm font-medium">{description}</p>
  </div>
);

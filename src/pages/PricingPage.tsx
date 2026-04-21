import React from 'react';
import { Check, Zap, Rocket } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const PricingPage: React.FC = () => {
  return (
    <div className="py-24 px-4 bg-[#F8FAFC]">
       <div className="container mx-auto max-w-6xl text-center">
          <div className="text-center mb-4 uppercase tracking-[0.2em] text-indigo-600 font-black text-xs">Access Plans</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-slate-500 text-lg mb-20 max-w-2xl mx-auto font-medium italic serif">Nurture your literary intuition without complexity. Select the tier that facilitates your journey.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
             {/* Free Plan */}
             <div className="p-10 rounded-2xl border border-slate-200 bg-white text-left transition-all hover:shadow-xl group">
                <div className="flex items-center gap-2 text-slate-400 mb-6 font-bold uppercase tracking-widest text-[10px]">
                   <Zap className="h-4 w-4" />
                   <span>Free Enthusiast</span>
                </div>
                <div className="mb-8">
                   <span className="text-5xl font-bold text-slate-800">$0</span>
                   <span className="text-slate-400 text-sm ml-2 font-medium">/ month</span>
                </div>
                <ul className="space-y-4 mb-10">
                   <PricingFeature text="10 Monthly Explorations" />
                   <PricingFeature text="Foundational Verse Analysis" />
                   <PricingFeature text="Public Literary Archives" />
                   <PricingFeature text="Standard AI Insight Engine" />
                </ul>
                <button className="w-full py-4 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                   Begin Journey
                </button>
             </div>

             {/* Pro Plan */}
             <div className="p-10 rounded-2xl border-2 border-indigo-600 bg-white text-left relative transition-all hover:shadow-2xl hover:shadow-indigo-100 overflow-hidden group">
                <div className="absolute top-4 right-[-35px] bg-indigo-600 text-white text-[9px] font-black px-10 py-1.5 rotate-45 uppercase tracking-widest shadow-lg">Scholar Preferred</div>
                
                <div className="flex items-center gap-2 text-indigo-600 mb-6 font-bold uppercase tracking-widest text-[10px]">
                   <Rocket className="h-4 w-4" />
                   <span>Scholar Master</span>
                </div>
                <div className="mb-8">
                   <span className="text-5xl font-bold text-slate-800">$19</span>
                   <span className="text-slate-400 text-sm ml-2 font-medium">/ month</span>
                </div>
                <ul className="space-y-4 mb-10">
                   <PricingFeature text="Unbounded Critical Explorations" />
                   <PricingFeature text="Advanced Historical Exegesis" />
                   <PricingFeature text="Priority Response Architecture" />
                   <PricingFeature text="Full Archive Export Privileges" />
                   <PricingFeature text="Curated Literary Collection" />
                </ul>
                <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
                   Ascend to Scholar
                </button>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 -mr-16 -mt-16 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700" />
             </div>
          </div>
       </div>
    </div>
  );
};

const PricingFeature = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-slate-300">
    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
       <Check className="h-3 w-3 text-green-400" />
    </div>
    <span className="text-sm">{text}</span>
  </li>
);

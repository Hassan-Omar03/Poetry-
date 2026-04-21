import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User as UserIcon, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/src/context/AppContext';

export const BlogsPage: React.FC = () => {
  const { blogs } = useAppContext();

  return (
    <div className="py-24 px-4 bg-[#F8FAFC]">
       <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-4 uppercase tracking-[0.2em] text-indigo-600 font-black text-xs">Literary Journal</div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-20 text-slate-800 tracking-tight">Fresh Insights from the Verse</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {blogs.map((blog, i) => (
                <motion.div 
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                   className="group rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-500"
                >
                   <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                      <img 
                        src={`https://picsum.photos/seed/${blog.id}/800/450`} 
                        alt={blog.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                   <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                         <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {blog.date}
                         </div>
                         <div className="flex items-center gap-1.5">
                            <UserIcon className="h-3 w-3" />
                            {blog.poet}
                         </div>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight serif italic tracking-tight">{blog.title}</h3>
                      <p className="text-sm text-slate-500 mb-8 line-clamp-3 flex-1 font-medium leading-relaxed">{blog.preview}</p>
                      <button className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all group-hover:underline underline-offset-4">
                         Explore Deep Dive
                         <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </div>
  );
};

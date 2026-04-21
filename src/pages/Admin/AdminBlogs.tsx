import React from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { useAppContext } from '@/src/context/AppContext';
import { cn } from '@/src/lib/utils';

export const AdminBlogs: React.FC = () => {
  const { blogs } = useAppContext();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Blog Management</h1>
          <p className="text-sm text-slate-500 font-medium italic serif">Curate and refine the platform's literary archives and critical dialogues.</p>
        </div>
        <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-[10px] uppercase tracking-widest font-bold text-white transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-100">
           <Plus className="h-4 w-4" />
           Compose New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {blogs.map((blog) => (
            <div key={blog.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-all duration-300">
               <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                  <img 
                    src={`https://picsum.photos/seed/${blog.id}/800/450`} 
                    alt={blog.title} 
                    className="h-full w-full object-cover opacity-90 group-hover:scale-105 transition-all duration-700 ease-out" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                     <CheckCircle2 className="h-3 w-3" />
                     Published archive
                  </div>
               </div>
               <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                     <Clock className="h-3 w-3" />
                     {blog.date}
                     <span className="h-1 w-1 rounded-full bg-slate-200" />
                     <span className="text-indigo-600 font-black">{blog.poet}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors serif italic tracking-tight">{blog.title}</h3>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                     <div className="flex items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                           <Eye className="h-3.5 w-3.5" /> 1.2k readers
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="h-9 w-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
                           <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="h-9 w-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm">
                           <Trash2 className="h-4 w-4" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

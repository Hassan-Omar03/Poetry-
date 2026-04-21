import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  BookOpen, 
  History, 
  Bookmark, 
  MessageSquare, 
  CreditCard,
  Settings,
  LogOut,
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  ShieldCheck,
  User as UserIcon,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAppContext } from '@/src/context/AppContext';

export const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { user, logout } = useAppContext();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  const userLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Explore Poems', href: '/explore', icon: Search },
    { name: 'History', href: '/history', icon: History },
    { name: 'Saved', href: '/saved', icon: Bookmark },
    { name: 'AI Chat', href: '/chat', icon: MessageSquare },
    { name: 'Pricing', href: '/pricing', icon: CreditCard },
  ];

  const adminLinks = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Credits', href: '/admin/credits', icon: CreditCard },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-indigo-950 text-white lg:static shadow-2xl">
      <div className="flex h-16 items-center justify-between border-b border-indigo-900/50 px-6">
        <Link to="/" className="flex items-center gap-3 text-white" onClick={onClose}>
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">P</div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">Poetry<span className="text-indigo-400">AI</span></span>
        </Link>
        <button onClick={onClose} className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10">
           <X className="h-5 w-5 text-indigo-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 custom-scroll">
        <div className="px-4 mb-8">
           <button 
             onClick={onClose}
             className="w-full py-2.5 rounded-lg gradient-bg font-semibold text-sm shadow-lg shadow-indigo-900/40 text-white transition-transform active:scale-95"
           >
             + New Analysis
           </button>
        </div>

        {user?.isAdmin && (
           <div className="px-3 mb-8">
              <Link 
                to={isAdmin ? "/dashboard" : "/admin"}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                  isAdmin 
                    ? "bg-white/5 text-indigo-300 border border-white/5 hover:bg-white/10" 
                    : "gradient-bg text-white shadow-lg shadow-indigo-900/20"
                )}
              >
                {isAdmin ? <UserIcon className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                {isAdmin ? "Switch to User View" : "Open Admin Panel"}
              </Link>
           </div>
        )}

        <nav className="space-y-1 px-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 border-l-4",
                  isActive 
                    ? "bg-white/10 border-indigo-400 text-white" 
                    : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-indigo-300" : "text-white/40 group-hover:text-white")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-4 py-6 border-t border-indigo-900/50">
        <div className="bg-indigo-900/40 rounded-xl p-4 shadow-inner">
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Usage Tracker</p>
          <div className="mt-3 flex justify-between text-[10px] font-bold text-indigo-200 uppercase">
             <span>Credits</span>
             <span>{Math.round(((user?.credits || 0) / 20) * 100)}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-indigo-800">
            <div 
              className="h-full rounded-full bg-indigo-400 transition-all duration-500" 
              style={{ width: `${Math.min(((user?.credits || 0) * 5), 100)}%` }}
            />
          </div>
          <Link to="/pricing" className="mt-4 block text-center text-xs font-black text-indigo-300 hover:text-white uppercase tracking-widest transition-colors">
            Upgrade Plan
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white shadow-lg shadow-indigo-600/20">
            {user?.name?.[0]}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-bold text-white">{user?.name?.[0]?.toUpperCase() + user?.name?.slice(1)}</p>
            <p className="truncate text-[10px] text-white/40 font-medium uppercase tracking-tighter">{user?.email}</p>
          </div>
          <button 
            onClick={logout}
            className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

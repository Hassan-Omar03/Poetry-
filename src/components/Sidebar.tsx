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
  LogOut,
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  ShieldCheck,
  User as UserIcon,
  X,
  Sparkles
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAppContext } from '@/src/context/AppContext';

export const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { user, logout } = useAppContext();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const userLinks = [
    { name: 'Dashboard',    href: '/dashboard', icon: Home },
    { name: 'Explore Poems',href: '/explore',   icon: Search },
    { name: 'History',      href: '/history',   icon: History },
    { name: 'Saved',        href: '/saved',     icon: Bookmark },
    { name: 'Pricing',      href: '/pricing',   icon: CreditCard },
  ];

  const adminLinks = [
    { name: 'Overview',   href: '/admin',            icon: LayoutDashboard },
    { name: 'Users',      href: '/admin/users',       icon: Users },
    { name: 'Credits',    href: '/admin/credits',     icon: CreditCard },
    { name: 'Blogs',      href: '/admin/blogs',       icon: FileText },
    { name: 'Analytics',  href: '/admin/analytics',   icon: BarChart3 },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col lg:static shadow-xl border-r border-slate-200"
      style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)' }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/20 px-6">
        <Link to="/" className="flex items-center gap-3 text-white" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Poetry<span className="text-indigo-200">Explainer</span>
          </span>
        </Link>
        <button onClick={onClose} className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10">
          <X className="h-5 w-5 text-white/70" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        {/* New Analysis button */}
        <div className="px-4 mb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white font-semibold text-sm text-indigo-700 shadow-md hover:bg-indigo-50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            + New Analysis
          </button>
        </div>

        {/* Admin toggle */}
        {user?.isAdmin && (
          <div className="px-3 mb-6">
            <Link
              to={isAdmin ? '/dashboard' : '/admin'}
              onClick={onClose}
              className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all bg-white/15 border border-white/20 text-white hover:bg-white/25"
            >
              {isAdmin ? <UserIcon className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              {isAdmin ? 'Switch to User View' : 'Open Admin Panel'}
            </Link>
          </div>
        )}

        {/* Nav links */}
        <nav className="space-y-0.5 px-3">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={onClose}
                className={cn(
                  'group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : 'text-white/80 hover:bg-white/15 hover:text-white'
                )}
              >
                <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-indigo-600' : 'text-white/60 group-hover:text-white')} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: usage + user */}
      <div className="px-4 py-5 border-t border-white/20">
        {/* Usage tracker */}
        <div className="bg-white/10 rounded-xl p-4 mb-4 border border-white/15">
          <div className="flex justify-between text-[11px] font-bold text-white/80 uppercase tracking-widest mb-2">
            <span>Credits</span>
            <span>{user?.credits ?? 0} left</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${Math.min(((user?.credits || 0) / 20) * 100, 100)}%` }}
            />
          </div>
          <Link
            to="/pricing"
            className="mt-3 block text-center text-[11px] font-bold text-white/70 hover:text-white uppercase tracking-widest transition-colors"
          >
            Buy Credits →
          </Link>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-sm font-black text-white shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name?.[0]?.toUpperCase()}{user?.name?.slice(1)}
            </p>
            <p className="truncate text-[11px] text-white/50">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="rounded-lg p-1.5 text-white/50 hover:bg-white/15 hover:text-white transition-all"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Search, BookOpen, History, Bookmark,
  CreditCard, LogOut, LayoutDashboard, Users,
  FileText, ShieldCheck, User as UserIcon,
  X, Sparkles, ChevronRight,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAppContext } from '@/src/context/AppContext';

export const Sidebar: React.FC<{ onClose?: () => void; onMenuOpen?: () => void }> = ({ onClose }) => {
  const { user, logout } = useAppContext();
  const location  = useLocation();
  const navigate  = useNavigate();
  const isAdmin   = location.pathname.startsWith('/admin');

  const userLinks = [
    { name: 'Dashboard',     href: '/dashboard',       icon: Home       },
    { name: 'Explore Poems', href: '/explore',         icon: Search     },
    { name: 'History',       href: '/history',         icon: History    },
    { name: 'Saved',         href: '/saved',           icon: Bookmark   },
    { name: 'Pricing',       href: '/dashboard/pricing', icon: CreditCard },  // → user pricing history
  ];

  const adminLinks = [
    { name: 'Overview', href: '/admin',          icon: LayoutDashboard },
    { name: 'Users',    href: '/admin/users',     icon: Users           },
    { name: 'Credits',  href: '/admin/credits',   icon: CreditCard      },
    { name: 'Blogs',    href: '/admin/blogs',     icon: FileText        },
  ];

  const links = isAdmin ? adminLinks : userLinks;
  const creditPct = Math.min(((user?.credits ?? 0) / 20) * 100, 100);

  return (
    <aside className="flex h-full w-64 flex-col bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">

      {/* ── Logo ── */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3" onClick={onClose}>
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-[0.95rem] font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            Poetry<span className="text-indigo-600">Explainer</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── New Analysis CTA ── flat orange, hover green */}
      <div className="px-4 pt-5 pb-2">
        <button
          onClick={() => { navigate('/analyze'); onClose?.(); }}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            New Analysis
          </div>
          <ChevronRight className="h-4 w-4 opacity-70" />
        </button>
      </div>

      {/* ── Admin toggle ── */}
      {user?.isAdmin && (
        <div className="px-4 pt-2">
          <Link
            to={isAdmin ? '/dashboard' : '/admin'}
            onClick={onClose}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-indigo-100 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all"
          >
            {isAdmin ? <UserIcon className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
            {isAdmin ? 'Switch to User View' : 'Open Admin Panel'}
          </Link>
        </div>
      )}

      {/* ── Nav section label ── */}
      <div className="px-5 pt-5 pb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          {isAdmin ? 'Admin' : 'Navigation'}
        </span>
      </div>

      {/* ── Nav links ── */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 pb-4">
        {links.map(link => {
          const Icon   = link.icon;
          const active = location.pathname === link.href;
          return (
            <Link
              key={link.name}
              to={link.href}
              onClick={onClose}
              className={cn(
                'group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold'
                  : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-700'
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0 transition-colors',
                active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500')} />
              <span className="flex-1">{link.name}</span>
              {active && <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom: credits + user ── */}
      <div className="border-t border-slate-100 p-4 space-y-3">
        {/* credits meter */}
        <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Credits remaining</span>
            <span className="text-xs font-black text-indigo-600">{user?.credits ?? 0}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white overflow-hidden border border-indigo-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-700"
              style={{ width: `${creditPct}%` }}
            />
          </div>
          <Link to="/dashboard/pricing" className="mt-2.5 block text-center text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            View Pricing History →
          </Link>
        </div>

        {/* user row */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-sm font-black text-white shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name?.[0]?.toUpperCase()}{user?.name?.slice(1)}
            </p>
            <p className="truncate text-[11px] text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

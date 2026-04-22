import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Feather, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAppContext } from '@/src/context/AppContext';

export const Header: React.FC = () => {
  const { user, logout } = useAppContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const isPublicHeader = !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/admin');

  if (!isPublicHeader && user) return null; // Dashboard uses sidebar

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">P</div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Poetry<span className="text-purple-600">Explainer</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-purple-600",
                location.pathname === link.href ? "text-purple-600" : "text-slate-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-semibold text-slate-600">{user.credits} Credits left</span>
              </div>
               <Link to={user.isAdmin ? "/admin" : "/dashboard"} className="text-sm font-semibold text-slate-700 hover:text-purple-600">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 transition-all hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors">
                    Login
                </Link>
                <Link to="/signup" className="flex items-center gap-2 rounded-lg gradient-bg px-6 py-2.5 text-sm font-bold text-white transition-all shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-95">
                   Sign Up Free
                </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-slate-800" /> : <Menu className="h-6 w-6 text-slate-800" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden shadow-xl">
          <div className="space-y-1 px-4 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "block py-3 text-base font-bold tracking-tight transition-colors",
                  location.pathname === link.href ? "text-purple-600" : "text-slate-600 hover:text-purple-600"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-8">
              {user ? (
                 <Link
                   to="/dashboard"
                   className="flex items-center justify-center rounded-xl gradient-bg py-4 text-sm font-bold text-white shadow-lg"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   Dashboard
                 </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-xl bg-slate-50 py-4 text-sm font-bold text-slate-700 border border-slate-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center rounded-xl gradient-bg py-4 text-sm font-bold text-white shadow-lg shadow-purple-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

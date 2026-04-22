import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-purple-400">
              <Feather className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight text-white">Poetry<span className="text-purple-500">Explainer</span></span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Illuminating the depths of human expression through the power of artificial intelligence. Understand any poem, in any language.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-slate-400 transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/features" className="text-sm text-slate-400 hover:text-purple-400">Features</Link></li>
              <li><Link to="/pricing" className="text-sm text-slate-400 hover:text-purple-400">Pricing</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-slate-400 hover:text-purple-400">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/blogs" className="text-sm text-slate-400 hover:text-purple-400">Blog</Link></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-purple-400">Community</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-purple-400">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-purple-400">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-purple-400">Terms</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-purple-400">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Poetry Explainer. All rights reserved.
          </p>
          <p className="mt-4 text-xs text-slate-500 md:mt-0">
            Made with love for literature and code.
          </p>
        </div>
      </div>
    </footer>
  );
};

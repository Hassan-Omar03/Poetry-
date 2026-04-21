import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';

// Pages - We'll create these next
import { LandingPage } from './pages/LandingPage';
import { BlogsPage } from './pages/BlogsPage';
import { PricingPage } from './pages/PricingPage';
import { Login, Signup } from './pages/AuthPages';
import { Dashboard } from './pages/Dashboard';
import { AdminOverview } from './pages/Admin/AdminOverview';
import { AdminUsers } from './pages/Admin/AdminUsers';
import { AdminUserDetail } from './pages/Admin/AdminUserDetail';
import { AdminBlogs } from './pages/Admin/AdminBlogs';
import { AdminCredits } from './pages/Admin/AdminCredits';
import { AdminAnalytics } from './pages/Admin/AdminAnalytics';
import { ChatPage } from './pages/ChatPage';

import { ExplorePage } from './pages/ExplorePage';
import { HistoryPage } from './pages/HistoryPage';
import { SavedPage } from './pages/SavedPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppContext();
  
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
        isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
         <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      </div>

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 lg:static lg:block transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Dashboard Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 md:px-8 backdrop-blur-md">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10"
              >
                 <MenuIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 ring-1 ring-white/10">
                 <CreditCard className="h-4 w-4 text-indigo-400" />
                 <span className="text-xs font-bold text-white">{user.credits} Credits</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold ring-2 ring-white/10 ring-offset-2 ring-offset-slate-950">
                {user.name[0]}
              </div>
           </div>
        </header>

        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-8 lg:p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

import { CreditCard, Home, Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from './lib/utils';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/blogs" element={<Layout><BlogsPage /></Layout>} />
          <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/signup" element={<Layout><Signup /></Layout>} />
          
          {/* User Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/explore" element={<DashboardLayout><ExplorePage /></DashboardLayout>} />
          <Route path="/history" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/saved" element={<DashboardLayout><SavedPage /></DashboardLayout>} />
          <Route path="/chat" element={<DashboardLayout><ChatPage /></DashboardLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout><AdminOverview /></DashboardLayout>} />
          <Route path="/admin/users" element={<DashboardLayout><AdminUsers /></DashboardLayout>} />
          <Route path="/admin/users/:userId" element={<DashboardLayout><AdminUserDetail /></DashboardLayout>} />
          <Route path="/admin/blogs" element={<DashboardLayout><AdminBlogs /></DashboardLayout>} />
          <Route path="/admin/credits" element={<DashboardLayout><AdminCredits /></DashboardLayout>} />
          <Route path="/admin/analytics" element={<DashboardLayout><AdminAnalytics /></DashboardLayout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

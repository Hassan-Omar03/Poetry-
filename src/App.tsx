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
import { Login, Signup, AdminLogin } from './pages/AuthPages';
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
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-slate-900 selection:bg-purple-200 selection:text-purple-900">
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
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
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
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 md:px-8 backdrop-blur-md shadow-sm">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                 <MenuIcon className="h-5 w-5 text-slate-600" />
              </button>
               <div className="flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5">
                 <CreditCard className="h-4 w-4 text-indigo-600" />
                 <span className="text-xs font-bold text-indigo-700">{user.credits} Credits</span>
               </div>
               <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
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

// Admin route protection
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppContext();
  if (!user || !user.isAdmin) return <Navigate to="/admin/login" />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/blogs" element={<Layout><BlogsPage /></Layout>} />
          <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* User Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/explore" element={<DashboardLayout><ExplorePage /></DashboardLayout>} />
          <Route path="/history" element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
          <Route path="/saved" element={<DashboardLayout><SavedPage /></DashboardLayout>} />
          <Route path="/chat" element={<DashboardLayout><ChatPage /></DashboardLayout>} />

          {/* Admin Routes (protected - requires admin login) */}
          <Route path="/admin" element={<AdminRoute><AdminOverview /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/users/:userId" element={<AdminRoute><AdminUserDetail /></AdminRoute>} />
          <Route path="/admin/blogs" element={<AdminRoute><AdminBlogs /></AdminRoute>} />
          <Route path="/admin/credits" element={<AdminRoute><AdminCredits /></AdminRoute>} />
          <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

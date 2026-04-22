import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { Menu as MenuIcon } from 'lucide-react';
import { cn } from './lib/utils';

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
import { AnalyzePage } from './pages/AnalyzePage';
import { UserPricingPage } from './pages/UserPricingPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
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
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* mobile overlay */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
        isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
         <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 lg:static lg:block transition-transform duration-300 ease-in-out p-3 shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="sticky top-3 h-[calc(100vh-24px)]">
          <Sidebar onClose={() => setIsSidebarOpen(false)} onMenuOpen={() => setIsSidebarOpen(true)} />
        </div>
      </div>

      {/* main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* mobile hamburger bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <MenuIcon className="h-5 w-5 text-slate-600" />
          </button>
          <span className="font-semibold text-slate-700">Menu</span>
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};


// Admin route protection
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppContext();
  if (!user || !user.isAdmin) return <Navigate to="/admin/login" />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default function App() {
  return (
    <ThemeProvider>
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
            <Route path="/dashboard"         element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/dashboard/pricing" element={<DashboardLayout><UserPricingPage /></DashboardLayout>} />
            <Route path="/analyze"           element={<DashboardLayout><AnalyzePage /></DashboardLayout>} />
            <Route path="/explore"           element={<DashboardLayout><ExplorePage /></DashboardLayout>} />
            <Route path="/history"           element={<DashboardLayout><HistoryPage /></DashboardLayout>} />
            <Route path="/saved"             element={<DashboardLayout><SavedPage /></DashboardLayout>} />
            <Route path="/chat"              element={<DashboardLayout><ChatPage /></DashboardLayout>} />

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

          {/* Floating color picker — visible on every page */}
          <ThemeSwitcher />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

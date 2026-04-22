import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  plan: 'free' | 'pro';
  isAdmin?: boolean;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  poet: string;
  date: string;
  preview: string;
}

// ── Admin credentials (in production, this would be server-side) ──
const ADMIN_ACCOUNTS = [
  { email: 'admin@poetry.com', password: 'admin123', name: 'Admin User' },
  { email: 'mohammadhassano823@gmail.com', password: 'hassan123', name: 'Hassan Omar' },
];

interface AppContextType {
  user: User | null;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  adminLogin: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  consumeCredit: () => boolean;
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: '1',
      title: 'The Road Not Taken: A Deep Dive',
      content: 'Robert Frosts masterpiece explores the theme of choices and consequences...',
      poet: 'Robert Frost',
      date: '2024-03-20',
      preview: 'Exploring the diverging paths of life through Frosts timeless imagery.'
    },
    {
      id: '2',
      title: 'Daffodils and Romanticism',
      content: 'William Wordsworths I Wandered Lonely as a Cloud is a quintessential romantic poem...',
      poet: 'William Wordsworth',
      date: '2024-03-21',
      preview: 'How nature inspires the human soul in Wordsworths famous verses.'
    },
    {
      id: '3',
      title: 'Shall I Compare Thee: Immortality Through Verse',
      content: 'Shakespeare\'s Sonnet 18 is a masterclass in how art transcends mortality...',
      poet: 'William Shakespeare',
      date: '2024-03-22',
      preview: 'How Shakespeare used the sonnet form to argue that poetry can conquer time itself.'
    }
  ]);

  // Regular user login (email only for demo)
  const login = (email: string, password?: string): { success: boolean; error?: string } => {
    if (!email) return { success: false, error: 'Email is required.' };

    setUser({
      id: 'user-' + Math.random().toString(36).substr(2, 6),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      credits: 20, // 20 credits on signup
      plan: 'free'
    });
    return { success: true };
  };

  // Admin login (requires email + password)
  const adminLogin = (email: string, password: string): { success: boolean; error?: string } => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    const adminAccount = ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (!adminAccount) {
      return { success: false, error: 'Invalid admin credentials. Access denied.' };
    }

    setUser({
      id: 'admin-1',
      name: adminAccount.name,
      email: adminAccount.email,
      credits: 999,
      plan: 'pro',
      isAdmin: true
    });
    return { success: true };
  };

  const logout = () => setUser(null);

  const consumeCredit = () => {
    if (!user) return false;
    if (user.credits <= 0) return false;
    setUser({ ...user, credits: user.credits - 1 });
    return true;
  };

  const addBlog = (blog: Omit<Blog, 'id' | 'date'>) => {
    const newBlog: Blog = {
      ...blog,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0]
    };
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <AppContext.Provider value={{ user, login, adminLogin, logout, consumeCredit, blogs, addBlog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

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

interface AppContextType {
  user: User | null;
  login: (email: string) => void;
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
    }
  ]);

  const login = (email: string) => {
    // Mock login
    if (email === 'admin@poetry.com' || email === 'mohammadhassano823@gmail.com') {
      setUser({
        id: 'admin-1',
        name: 'Admin User',
        email: email,
        credits: 999,
        plan: 'pro',
        isAdmin: true
      });
    } else {
      setUser({
        id: 'user-1',
        name: 'John Doe',
        email: email || 'john@example.com',
        credits: 20, // 20 credits on signup as requested
        plan: 'free'
      });
    }
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
    <AppContext.Provider value={{ user, login, logout, consumeCredit, blogs, addBlog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

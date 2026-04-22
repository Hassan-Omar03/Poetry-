import React, { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_COLOR = '#cefbcb';
const STORAGE_KEY   = 'poetry-accent-bg';

interface ThemeContextValue {
  accentBg: string;
  setAccentBg: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  accentBg: DEFAULT_COLOR,
  setAccentBg: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentBg, setAccentBgState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_COLOR;
  });

  // Apply to CSS variable on every change
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-bg', accentBg);
    localStorage.setItem(STORAGE_KEY, accentBg);
  }, [accentBg]);

  const setAccentBg = (color: string) => setAccentBgState(color);

  return (
    <ThemeContext.Provider value={{ accentBg, setAccentBg }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

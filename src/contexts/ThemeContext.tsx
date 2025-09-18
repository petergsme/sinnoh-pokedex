import { createContext, useState } from 'react';

interface ThemeContextType {
  theme: 'lightmode' | 'darkmode';
  setLightMode: () => void;
  setDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'lightmode' | 'darkmode'>('lightmode');

  const setLightMode = () => {
    setTheme('lightmode');
  };
  const setDarkMode = () => {
    setTheme('darkmode');
  };

  const value = {
    theme,
    setLightMode,
    setDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

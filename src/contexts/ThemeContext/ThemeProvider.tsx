import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps } from './ThemeContext';
import { useState } from 'react';

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

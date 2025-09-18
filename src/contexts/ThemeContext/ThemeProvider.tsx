import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps } from './ThemeContext';
import { useState, useEffect } from 'react';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'lightmode' | 'darkmode'>('lightmode');

  useEffect(() => {
    const body = document.body;

    if (theme === 'darkmode') {
      body.classList.add('body--color-darkmode');
    } else {
      body.classList.remove('body--color-darkmode');
    }
  }, [theme]);

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

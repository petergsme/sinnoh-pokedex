import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps } from './ThemeContext';
import { useState, useEffect } from 'react';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const getLocalTheme = () => {
    const savedTheme = localStorage.getItem('localtheme');

    if (savedTheme === 'lightmode' || savedTheme === 'darkmode') {
      return savedTheme;
    }
    return 'lightmode';
  };

  const [theme, setTheme] = useState<'lightmode' | 'darkmode'>(getLocalTheme);

  useEffect(() => {
    const body = document.body;

    try {
      localStorage.setItem('localtheme', theme);
    } catch (error) {
      console.warn(`Couldn't store theme:`, error);
    }

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

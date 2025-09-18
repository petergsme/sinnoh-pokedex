import { createContext } from 'react';

interface ThemeContextType {
  theme: 'lightmode' | 'darkmode';
  setLightMode: () => void;
  setDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
}

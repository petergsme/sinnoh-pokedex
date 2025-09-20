import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, defaultValue: string, validValues: string[]) => {
  const getLocalValue = () => {
    const saved = localStorage.getItem(key);

    if (saved && validValues.includes(saved)) {
      return saved;
    }
    return defaultValue;
  };

  const [value, setValue] = useState(getLocalValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Couldn't store ${key}:`, error);
    }
  }, [value]);

  return [value, setValue] as const;
  // We have to assert the order in which this is returned.
};

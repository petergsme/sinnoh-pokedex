import { useEffect } from 'react';

interface UseBodyScrollLockOptions {
  enabled?: boolean;
}

export const useBodyScrollLock = ({ enabled = true }: UseBodyScrollLockOptions) => {
  useEffect(() => {
    if (!enabled) return;
    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [enabled]);
};

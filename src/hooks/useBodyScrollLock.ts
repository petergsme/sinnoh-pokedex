import { useEffect } from 'react';

interface UseBodyScrollLockOptions {
  enabled?: boolean;
}

export const useBodyScrollLock = ({ enabled = true }: UseBodyScrollLockOptions) => {
  useEffect(() => {
    if (!enabled) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [enabled]);
};

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getItem, setItem } from '../utils/storage';

export function usePersistedForm<T extends Record<string, any>>(key: string, defaultValues: T) {
  const methods = useForm<T>({ defaultValues, mode: 'onChange' });

  useEffect(() => {
    (async () => {
      const saved = await getItem<T>(key);
      if (saved) methods.reset(saved);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sub = methods.watch((v) => setItem(key, v));
    return () => sub.unsubscribe();
  }, [methods, key]);

  return methods;
}

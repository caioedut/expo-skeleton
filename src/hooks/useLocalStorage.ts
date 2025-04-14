import { useCallback, useEffect, useMemo, useState } from 'react';

import { useStoreState } from 'react-state-hooks';

import LocalStorage from '@/services/LocalStorage';

export default function useLocalStorage<T>(key: string, initialValue?: T) {
  const [isPending, setIsPending] = useState(!initialValue);
  const [state, _setState] = useStoreState(`storage.${key}`, initialValue);

  const setState: typeof _setState = useCallback(
    (value) => {
      _setState((current) => {
        const next = value instanceof Function ? value(current) : value;

        // Try to set local storage twice (on error)
        LocalStorage.set(key, next)
          .catch(() => LocalStorage.set(key, next))
          .catch(() => null);

        return next;
      });

      setIsPending(false);
    },
    [key, _setState],
  );

  useEffect(() => {
    LocalStorage.get<T>(key)
      .catch(() => undefined)
      .then((value) => {
        if (typeof value !== 'undefined') {
          _setState(value);
        }

        setIsPending(false);
      });
  }, [key, _setState]);

  return useMemo(() => [state, setState, isPending] as const, [isPending, setState, state]);
}

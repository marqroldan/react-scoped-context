import {useMemo, useRef, useLayoutEffect} from 'react';

/**
 * Source: https://medium.com/async/how-useselector-can-trigger-an-update-only-when-we-want-it-to-a8d92306f559
 *
 * Always return the same value "holder" to prevent unnecessary re-renders;
 */
export function useContextValue(store?: any) {
  // Stash our store in a ref so it's current state can be referenced
  // in useMemo below without triggering an update
  const storeRef = useRef(store);
  storeRef.current = store;

  // Stash subscribers in a ref so they don't trigger updates
  const subscribersRef = useRef([]);

  useLayoutEffect(() => {
    // Notify all subscribers when store state changes
    // @ts-ignore
    subscribersRef.current.forEach((sub) => sub());
  }, [store]);

  // Empty dep array means our context value will never change
  // so it will never trigger updates to useEffect/useCallback/useMemo
  const value = useMemo(
    () => ({
      // @ts-ignore
      subscribe: (cb) => {
        // @ts-ignore
        subscribersRef.current.push(cb);
        return () => {
          subscribersRef.current = subscribersRef.current.filter(
            (sub) => sub !== cb,
          );
        };
      },
      getState: () => storeRef.current,
    }),
    [],
  );

  return value;
}

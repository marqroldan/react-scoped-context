import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import type {Context} from 'react';

import type {DefaultState, DataContext} from './types';

export const createContextSelector = <T = DefaultState,>(
  context: Context<DataContext<T>>,
) => {
  function useSelector<TSelected>(
    selector: (state: T) => TSelected,
  ): TSelected {
    const [, forceRender] = useReducer((s) => s + 1, 0);
    const store = useContext<DataContext<T>>(context);

    // Store a ref of our current selector so it can be used
    // within checkForUpdates without triggering an update to the
    // callback itself
    const selectorRef = useRef(selector);
    selectorRef.current = selector;
    const selectedStateRef = useRef<ReturnType<typeof selector>>(
      selector(store.getState()),
    );
    selectedStateRef.current = selector(store.getState());

    const checkForUpdates = useCallback(() => {
      // Compare new selected state to the last time this hook ran
      const newState = selectorRef.current(store.getState());
      // If new state differs from previous state, rerun this hook
      if (newState !== selectedStateRef.current) {
        forceRender();
      }
    }, [store]);

    // This effect should only run once on mount, since
    // store should never change
    useEffect(() => {
      // Subscribe to store changes, call checkForUpdates
      // when a change occurs
      const subscription = store.subscribe(checkForUpdates);
      return () => subscription();
    }, [store, checkForUpdates]);

    return selectedStateRef.current;
  }

  return useSelector;
};

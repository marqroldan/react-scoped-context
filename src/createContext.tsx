import React from 'react';
import type {DataContext, DefaultState} from './types';

export function createContext<T = DefaultState>() {
  return React.createContext<DataContext<T>>({
    getState: () => ({} as T),
    subscribe: () => () => {},
  });
}

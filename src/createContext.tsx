import {createContext as _createContext} from 'react';
import type {DataContext, DefaultState} from './types';

export function createContext<T = DefaultState>() {
  return _createContext<DataContext<T>>({
    getState: () => ({} as T),
    subscribe: () => () => {},
  });
}

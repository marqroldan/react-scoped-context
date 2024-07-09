export type DefaultState = Record<string, any>;

export type DataContext<T = DefaultState> = {
  subscribe(subscriber: () => void): () => void;
  getState(): T;
};

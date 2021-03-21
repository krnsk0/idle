import React, { createContext, useContext, FC } from 'react';
import { Store } from './store';

// singleton
let store: Store;

export const StoreContext = createContext<Store | undefined>(undefined);

export const RootStoreProvider: FC = ({ children }) => {
  const root = store ?? new Store();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

export const useRootStore = (): Store => {
  const store = useContext(StoreContext);
  if (store === undefined) {
    throw new Error('useRootStore must be used within provider');
  }
  return store;
};

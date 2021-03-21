import React, { createContext, ReactNode, useContext } from 'react';
import { Store } from './store';

// singleton
let store: Store;

export const StoreContext = createContext<Store | undefined>(undefined);

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const root = store ?? new Store();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within provider');
  }
  return context;
};

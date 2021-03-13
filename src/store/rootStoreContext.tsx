import React, { createContext, ReactNode, useContext } from 'react';
import { RootStore } from './rootStore';

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);

// provider
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

// hook
export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};

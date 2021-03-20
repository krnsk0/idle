import { createContext, useContext } from 'react';
import type { RootStore } from './rootStore';

export const StoreContext = createContext<RootStore | undefined>(undefined);

// hook
export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};

import React, { createContext, ReactNode, useContext } from 'react';
import { deserialize } from 'serializr';
import { RootStore, saveKey } from './rootStore';

const StoreContext = createContext<RootStore | undefined>(undefined);

// provider
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  let root: RootStore;

  // attempt to load saved game
  try {
    const saveString = window.localStorage.getItem(saveKey);
    if (saveString) {
      const saveData = JSON.parse(saveString);
      root = deserialize<RootStore>(RootStore, saveData);
    } else {
      root = new RootStore();
    }
  } catch (e) {
    console.log('loading error', e);
    root = new RootStore();
  }

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

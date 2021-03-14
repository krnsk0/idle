import React, { createContext, ReactNode, useContext } from 'react';
import { deserialize } from 'serializr';
import { RootStore } from './rootStore';

const StoreContext = createContext<RootStore | undefined>(undefined);

// provider
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  let root: RootStore;

  // attempt to load saved game
  try {
    const saveGame = window.localStorage.getItem('save');
    if (saveGame) {
      // TODO: load saved game
      root = new RootStore();
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

import React, { createContext, ReactNode, useContext } from 'react';
import { deserialize } from 'serializr';
import { DebugPanel } from '../components/debugPanel/debugPanel';
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

      // TODO: find a better way to do this
      const orignalConsoleWarn = console.warn;
      console.warn = () => {};
      root = deserialize<RootStore>(RootStore, saveData, (err) => {
        if (err) console.error('Deserialization err: ', err);
      });
      console.warn = orignalConsoleWarn;
    } else {
      root = new RootStore();
    }
  } catch (err) {
    console.error('loading error', err);
    root = new RootStore();
  }

  return (
    <StoreContext.Provider value={root}>
      {children}
      <DebugPanel />
    </StoreContext.Provider>
  );
};

// hook
export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};

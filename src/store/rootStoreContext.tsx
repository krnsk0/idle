import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { deserialize } from 'serializr';
import { DebugPanel } from '../components/debugPanel/debugPanel';
import { RootStore, saveKey } from './rootStore';

const StoreContext = createContext<RootStore | undefined>(undefined);

// provider
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const [root, setRoot] = useState<RootStore | undefined>(undefined);

  const loadGame = () => {
    // attempt to load saved game
    try {
      const saveString = window.localStorage.getItem(saveKey);
      if (saveString) {
        const saveData = JSON.parse(saveString);

        const orignalConsoleWarn = console.warn;
        console.warn = () => {};
        setRoot(
          deserialize<RootStore>(RootStore, saveData, (err) => {
            if (err) console.error('Deserialization err: ', err);
          })
        );
        console.warn = orignalConsoleWarn;
      } else {
        setRoot(new RootStore());
      }
    } catch (err) {
      console.error('loading error', err);
      setRoot(new RootStore());
    }
  };

  useEffect(() => {
    loadGame();
  }, []);

  return root ? (
    <StoreContext.Provider value={root}>
      {children}
      <DebugPanel />
    </StoreContext.Provider>
  ) : (
    <>loading...</>
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

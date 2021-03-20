import React, {
  FC,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StoreContext } from '../../store/rootStoreContext';
import { RootStore, saveKey } from '../../store/rootStore';
import { DebugPanel } from '../debugPanel/debugPanel';
import Game from '../game/game';
import { deserialize } from 'serializr';

const App: FC = () => {
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
      <Game />
      <DebugPanel />
    </StoreContext.Provider>
  ) : (
    <div>loading</div>
  );
};

export default App;

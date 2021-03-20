import React, { FC, useEffect, useState } from 'react';
import { StoreContext } from '../../store/rootStoreContext';
import { RootStore, saveKey } from '../../store/rootStore';
import { DebugPanel } from '../debugPanel/debugPanel';
import Game from '../game/game';
import { deserialize } from 'serializr';

const GameWithStore: FC = () => {
  const [root, setRoot] = useState<RootStore | undefined>(undefined);

  const loadGame = () => {
    // attempt to load saved game
    try {
      const saveString = window.localStorage.getItem(saveKey);
      if (saveString) {
        // monkeypatch to supress unhelpful warnings
        const orignalConsoleWarn = console.warn;
        console.warn = () => {};

        // deserialize
        setRoot(
          deserialize<RootStore>(RootStore, JSON.parse(saveString), (err) => {
            if (err) console.error('Deserialization err: ', err);
          })
        );

        // undo monekypatch
        console.warn = orignalConsoleWarn;
      } else {
        setRoot(new RootStore());
      }
    } catch (err) {
      console.error('loading error', err);
      setRoot(new RootStore());
    }
  };

  const clearSave = () => {
    window.localStorage.removeItem(saveKey);
    loadGame();
  };

  useEffect(() => {
    loadGame();
  }, []);

  return root ? (
    <StoreContext.Provider value={root}>
      <Game />
      <DebugPanel clearSave={clearSave} />
    </StoreContext.Provider>
  ) : (
    <div>loading...</div>
  );
};

export default GameWithStore;

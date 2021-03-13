import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import type { s } from '../../types';
import { useRootStore } from '../../store/rootStoreContext';
import CityInterface from '../cityInterface/cityInterface';
import ResourceView from '../resourceView/resourceView';

import './app.css';

const App: FC = observer(() => {
  const rootStore = useRootStore();

  const gameLoop = (now: s.Milliseconds) => {
    rootStore.tick(now);
    window.requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    gameLoop(0);
  }, []);

  return (
    <div className="container">
      <ResourceView />
      <CityInterface />
    </div>
  );
});

export default App;

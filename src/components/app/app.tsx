import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import type { s } from '../../types';
import { useRootStore } from '../../store/rootStoreContext';
import './app.css';
import CityPanel from '../cityPanel/cityPanel';

const App: FC = observer(() => {
  const rootStore = useRootStore();

  const gameLoop = (now: s.Milliseconds) => {
    rootStore.tick(now);
    window.requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    gameLoop(0);
    rootStore.cityStore.addCity();
  }, []);

  return (
    <div>
      <div className="container">
        {rootStore.cityStore.cities.map((city) => {
          return <CityPanel id={city.id} key={city.id} />;
        })}
      </div>
      <button type="button" onClick={() => rootStore.cityStore.addCity()}>
        add city
      </button>
    </div>
  );
});

export default App;

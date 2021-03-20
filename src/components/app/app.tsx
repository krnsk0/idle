import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import type { s } from '../../semanticTypes';
import { useRootStore } from '../../store/rootStoreContext';
import CityPanel from '../cityPanel/cityPanel';
import styles from './app.module.scss';

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
    <div className={styles.container}>
      {rootStore.cityStore.cities.map((city) => {
        return <CityPanel id={city.id} key={city.id} />;
      })}
    </div>
  );
});

export default App;

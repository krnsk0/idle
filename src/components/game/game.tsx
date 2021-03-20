import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import type { s } from '../../semanticTypes';
import { useRootStore } from '../../store/rootStoreContext';
import CityPanel from '../cityPanel/cityPanel';
import styles from './game.module.scss';

const Game: FC = observer(() => {
  const [animationFrameRequestId, setAnimationFrameRequestId] = useState(0);
  const rootStore = useRootStore();

  const gameLoop = (now: s.Milliseconds) => {
    rootStore.tick(now);
    setAnimationFrameRequestId(window.requestAnimationFrame(gameLoop));
  };

  /**
   * Starts the game loop
   * RootStore is provided to the dependencies array
   * to make sure gameLoop restarts when save is cleared
   * or overwritten
   */
  useEffect(() => {
    window.cancelAnimationFrame(animationFrameRequestId);
    gameLoop(0);
  }, [rootStore]);

  return (
    <div className={styles.container}>
      {rootStore.cityStore.cities.map((city) => {
        return <CityPanel id={city.id} key={city.id} />;
      })}
    </div>
  );
});

export default Game;

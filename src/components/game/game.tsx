import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import type { s } from '../../semanticTypes';
import { useRootStore } from '../../store/useRootStore';
import CityPanel from '../cityPanel/cityPanel';
import styles from './game.module.scss';

const Game: FC = observer(() => {
  const rootStore = useRootStore();

  const gameLoop = () => {
    rootStore.tick(Date.now());
    window.requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    rootStore.loadGame();
    gameLoop();
  }, []);

  return (
    <div className={styles.container}>
      {rootStore.gameState.cityStore.cities.map((city) => {
        return <CityPanel id={city.id} key={city.id} />;
      })}
    </div>
  );
});

export default Game;

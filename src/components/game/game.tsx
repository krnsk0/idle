import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { useRootStore } from '../../store/useRootStore';
import CityPanel from '../cityPanel/cityPanel';
import styles from './styles.module.scss';

const Game: FC = observer(() => {
  const { gameState, loadGame, tick } = useRootStore();

  const gameLoop = () => {
    tick(Date.now());
    window.requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    loadGame();
    gameLoop();
  }, []);

  return (
    <div className={styles.container}>
      {gameState.cityStore.cities.map((city) => {
        return <CityPanel id={city.id} key={city.id} />;
      })}
    </div>
  );
});

export default Game;

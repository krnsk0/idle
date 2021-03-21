import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store/useRootStore';
import styles from './styles.module.scss';

export const DebugPanel: FC = observer(() => {
  const { gameState, clearSave, copySave, loadFromClipboard } = useRootStore();

  return (
    <div className={styles.container}>
      <button type="button" onClick={() => gameState.cityStore.addCity()}>
        add city
      </button>
      <button type="button" onClick={() => clearSave()}>
        clear save
      </button>
      <button type="button" onClick={() => copySave()}>
        copy save string
      </button>
      <button type="button" onClick={() => loadFromClipboard()}>
        load from clipboard
      </button>
    </div>
  );
});

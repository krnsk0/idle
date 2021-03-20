import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store/rootStoreContext';
import styles from './debugPanel.module.scss';

type DebugPanelProps = {
  clearSave: () => void;
};

export const DebugPanel: FC<DebugPanelProps> = observer(({ clearSave }) => {
  const rootStore = useRootStore();

  return (
    <div className={styles.container}>
      <button type="button" onClick={() => rootStore.cityStore.addCity()}>
        add city
      </button>
      <button type="button" onClick={() => clearSave()}>
        clear save
      </button>
    </div>
  );
});

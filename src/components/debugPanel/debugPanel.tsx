import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store/rootStoreContext';
import styles from './debugPanel.module.scss';
import { saveKey } from '../../store/rootStore';

type DebugPanelProps = {
  clearSave: () => void;
  loadFromClipboard: () => void;
};

export const DebugPanel: FC<DebugPanelProps> = observer(
  ({ clearSave, loadFromClipboard }) => {
    const rootStore = useRootStore();

    const copySave = () => {
      try {
        const saveString = window.localStorage.getItem(saveKey);
        if (saveString) {
          const formattedSaveString = JSON.stringify(
            JSON.parse(saveString),
            null,
            2
          );
          window.navigator.clipboard.writeText(formattedSaveString);
          console.log('copied');
        } else {
          console.log('copy failed');
        }
      } catch (err) {
        console.error('copy failed', err);
      }
    };

    return (
      <div className={styles.container}>
        <button type="button" onClick={() => rootStore.cityStore.addCity()}>
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
  }
);

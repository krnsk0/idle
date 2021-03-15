import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store/rootStoreContext';
import type { s } from '../../semanticTypes';
import styles from './cityPanel.module.scss';

type CityPanelProps = {
  id: s.UUID;
};

const CityPanel: FC<CityPanelProps> = observer(({ id }) => {
  const { cityStore } = useRootStore();
  const city = cityStore.getCityById(id);

  return (
    <div className={styles['city-container']}>
      <div>{id}</div>
      {city?.buildings.map((building) => (
        <button
          key={building.buildingName}
          type="button"
          onClick={() => building.buy(1)}
        >
          <span>{building.buildingName}</span>
          <span>{building.quantity}</span>
          <div>
            costs:
            {building.buildingCosts.map(({ resourceName, cost }) => {
              return (
                <div>
                  <span>{resourceName}</span>
                  <span>{cost.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </button>
      ))}
      {city?.resources.map((resource) => (
        <div
          className={styles['resource-container']}
          key={resource.resourceName}
        >
          <span>{resource.resourceName}</span>
          <span>{resource.productionPerSecond}/sec</span>
          <span>{resource.quantity.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
});

export default CityPanel;

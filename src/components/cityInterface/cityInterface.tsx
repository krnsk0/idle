import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store/rootStoreContext';
import './cityInterface.css';

const CityInterface: FC = observer(() => {
  const { buildingStore } = useRootStore();

  return (
    <div className="city-container">
      {buildingStore.buildings.map((building) => (
        <button key={building.name} type="button">
          <span>{building.name}</span>
          <span>{building.quantity}</span>
        </button>
      ))}
    </div>
  );
});

export default CityInterface;

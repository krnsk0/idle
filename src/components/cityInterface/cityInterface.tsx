import React, { FC } from 'react';
import './cityInterface.css';

const buildings = [
  {
    name: 'farm',
    qty: 2,
  },
  {
    name: 'mine',
    qty: 5,
  },
  {
    name: 'lab',
    qty: 1,
  },
];

const CityInterface: FC = () => {
  return (
    <div className="city-container">
      {buildings.map((building) => (
        <button key={building.name} type="button">
          <span>{building.name}</span>
          <span>{building.qty}</span>
        </button>
      ))}
    </div>
  );
};

export default CityInterface;

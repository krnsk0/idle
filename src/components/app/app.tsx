import React, { FC } from 'react';
import CityInterface from '../cityInterface/cityInterface';
import ResourceView from '../resourceView/resourceView';
import './app.css';

const App: FC = () => {
  return (
    <div className="container">
      <ResourceView />
      <CityInterface />
    </div>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import GameWithStore from './components/gameWithStore/gameWithStore';
import Game from './components/game/game';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <GameWithStore />
  </React.StrictMode>,
  document.getElementById('root')
);

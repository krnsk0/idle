import React from 'react';
import ReactDOM from 'react-dom';
import { DebugPanel } from './components/debugPanel/debugPanel';
import Game from './components/game/game';
import './index.css';
import { RootStoreProvider } from './store/useRootStore';

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider>
      <Game />
      <DebugPanel />
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

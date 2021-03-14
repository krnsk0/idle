import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import './index.css';
import { RootStoreProvider } from './store/rootStoreContext';

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

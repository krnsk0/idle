import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import './index.css';
import { RootStoreProvider } from './store/rootStore';

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

if (import.meta.hot) {
  import.meta.hot.accept();
}

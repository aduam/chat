import React from 'react';
import ReactDOM from 'react-dom';

import { AppRouter } from './router/app-router';
import { SocketProvider } from './context/socket-context';
import './index.css';

ReactDOM.render(
  <SocketProvider>
    <AppRouter />
  </SocketProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import { ChatApp } from './chat-app';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ChatApp />
    <Toaster />
  </BrowserRouter>,
  document.getElementById('root')
);

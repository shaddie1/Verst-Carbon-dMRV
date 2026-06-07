// Entry point. No more window globals — everything is wired through ES imports.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tokens.css';
import './styles/app.css';
import './imageSlot.js';
import { App } from './App.jsx';
import { DataProvider } from './store.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);

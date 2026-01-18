import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';

// Suppress React DevTools warnings in development
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && 
        (args[0].includes('Received `true` for a non-boolean attribute') || 
         args[0].includes('Source map error'))) {
      return;
    }
    originalWarn(...args);
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

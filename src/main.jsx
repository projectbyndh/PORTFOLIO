import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';

// Disable all console methods to prevent logs from appearing
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
} else {
  // In development, disable specific console logs
  const noop = () => {};
  console.log = noop;
  console.warn = noop;
  console.info = noop;
  console.debug = noop;
  // Keep console.error for debugging
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

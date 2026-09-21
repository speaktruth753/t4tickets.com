// Ensure fetch can be reassigned without throwing "Cannot set property fetch of #<Window> which has only a getter"
try {
  if (typeof window !== 'undefined') {
    const rawFetch = window.fetch ? window.fetch.bind(window) : undefined;
    let currentFetch = rawFetch;
    const desc = {
      get() {
        return currentFetch;
      },
      set(fn: any) {
        currentFetch = fn;
      },
      configurable: true,
      enumerable: true
    };
    Object.defineProperty(window, 'fetch', desc);
    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        Object.defineProperty(Window.prototype, 'fetch', desc);
      } catch (_) {}
    }
  }
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

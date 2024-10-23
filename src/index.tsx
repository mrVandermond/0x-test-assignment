import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const start = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Element with id "root" is missing');
  }

  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

start();

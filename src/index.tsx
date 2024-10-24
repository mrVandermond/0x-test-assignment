import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { getGradientByTime } from './utils';

const queryClient = new QueryClient();

const start = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Element with id "root" is missing');
  }

  // Set the background of root element
  rootElement.style.background = getGradientByTime();


  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
}

start();

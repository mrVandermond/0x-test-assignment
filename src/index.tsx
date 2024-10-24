import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const start = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Element with id "root" is missing');
  }

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

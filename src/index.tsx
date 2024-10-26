import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import './style.css';

import App from './components/App/App';
import { getGradientByTime } from './utils';
import { DAY_IN_MS } from './constants';

const start = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Element with id "root" is missing');
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: DAY_IN_MS,
        retry: false,
      },
    },
  });

  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  // Set the background of root element
  rootElement.style.background = getGradientByTime();


  const root = createRoot(rootElement);
  const persistOptions = {
    persister: localStoragePersister,
  };

  root.render(
    <StrictMode>
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <App />
      </PersistQueryClientProvider>
    </StrictMode>
  );
}

const registerSW = () => {
  if (!('serviceWorker' in navigator) || process.env.NODE_ENV === 'development') return;

  navigator.serviceWorker.register('./service-worker.js')
    .catch((error) => console.error(error));
}

registerSW();
start();

import { useCallback, useEffect, useState } from 'react';

import { GeolocationCoords } from '../types/geolocation';

const GEOLOCATION_CACHE_KEY = 'geolocation';

function restoreGeolocationCoords(): GeolocationCoords | undefined {
  try {
    const geolocation = localStorage.getItem(GEOLOCATION_CACHE_KEY);

    if (!geolocation) return;

    return JSON.parse(geolocation);
  } finally {
  }
}

function cacheGeolocationCoords(coords: GeolocationCoords) {
  localStorage.setItem(GEOLOCATION_CACHE_KEY, JSON.stringify(coords));
}

export function useGeolocation(initialValue?: GeolocationCoords) {
  const [coords, setCoords] = useState(initialValue);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [rerenderDependency, forceRerender] = useState({});
  const [isAwaitingGeolocation, setIsAwaitingGeolocation] = useState(false);

  const refetchGeolocation = useCallback(() => {
    setError(null);
    forceRerender({});
  }, []);

  useEffect(() => {
    const cachedGeolocation = restoreGeolocationCoords();

    if (cachedGeolocation) {
      setCoords(cachedGeolocation);
    }
  }, []);

  useEffect(() => {
    setIsAwaitingGeolocation(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const coords = {
        latitude: +latitude.toFixed(2),
        longitude: +longitude.toFixed(2),
      };

      setCoords(coords);
      cacheGeolocationCoords(coords);
      setIsAwaitingGeolocation(false);
    }, (error) => {
      console.error(error);
      setError(error);
      setIsAwaitingGeolocation(false);
    });
  }, [rerenderDependency]);

  return {
    coords,
    error,
    refetchGeolocation,
    isAwaitingGeolocation,
  };
}

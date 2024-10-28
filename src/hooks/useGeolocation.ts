import { useCallback, useEffect, useState } from 'react';

import { GeolocationCoords } from '../types/geolocation';
import { cacheGeolocationCoords, restoreGeolocationCoords } from '../utils';

/**
 * Requests geolocation coordinates
 * Exposes coordinates, retry function, error and awaiting status
 */
export function useGeolocation() {
  const [coords, setCoords] = useState<GeolocationCoords | undefined>(undefined);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [rerenderDependency, forceRerender] = useState({});
  const [isAwaitingGeolocation, setIsAwaitingGeolocation] = useState(false);

  const retryRequestGeolocation = useCallback(() => {
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
    retryRequestGeolocation,
    isAwaitingGeolocation,
  };
}

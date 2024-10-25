import { useEffect, useState } from 'react';

interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

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

  useEffect(() => {
    const cachedGeolocation = restoreGeolocationCoords();

    if (cachedGeolocation) {
      setCoords(cachedGeolocation);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const coords = {
        latitude: +latitude.toFixed(2),
        longitude: +longitude.toFixed(2),
      };

      setCoords(coords);
      cacheGeolocationCoords(coords);
    }, (error) => {
      console.error(error);
    });
  }, []);

  return coords;
}

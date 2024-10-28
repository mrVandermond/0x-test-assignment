import { GeolocationCoords } from '../types/geolocation';
import { GEOLOCATION_CACHE_KEY } from '../constants';

export function restoreGeolocationCoords(): GeolocationCoords | undefined {
  try {
    const geolocation = localStorage.getItem(GEOLOCATION_CACHE_KEY);

    if (!geolocation) return;

    return JSON.parse(geolocation);
  } finally {
  }
}

export function cacheGeolocationCoords(coords: GeolocationCoords) {
  localStorage.setItem(GEOLOCATION_CACHE_KEY, JSON.stringify(coords));
}

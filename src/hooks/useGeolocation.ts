import { useEffect, useState } from 'react';

interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

export function useGeolocation(initialValue?: GeolocationCoords) {
  const [coords, setCoords] = useState(initialValue);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      setCoords({ latitude, longitude });
    });
  }, []);

  return coords;
}

import React from 'react';
import './style.css';

import { fetchDailyForecast, fetchHourlyForecast, fetchLocationByGeoposition } from './api';
import { useQuery } from '@tanstack/react-query';
import { useGeolocation } from './hooks';
import { DAY_IN_MS, THIRTY_MINS_IN_MS } from './constants';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';

export default function App() {
  const geolocationCoords = useGeolocation();

  const { data: location } = useQuery({
    staleTime: Infinity,
    queryKey: ['location', geolocationCoords],
    queryFn: () => fetchLocationByGeoposition(geolocationCoords?.latitude, geolocationCoords?.longitude),
    enabled: !!geolocationCoords,
  });
  const { data: hourlyForecast } = useQuery({
    staleTime: THIRTY_MINS_IN_MS,
    queryKey: ['hourlyForecast', location],
    queryFn: () => fetchHourlyForecast(location?.key),
    enabled: !!location,
  });
  const { data: dailyForecast } = useQuery({
    staleTime: DAY_IN_MS,
    queryKey: ['dailyForecast', location],
    queryFn: () => fetchDailyForecast(location?.key),
    enabled: !!location,
  });

  if (!location || !hourlyForecast || !dailyForecast) {
    return null;
  }

  return (
    <div>
      <CurrentWeather
        locationName={location.localizedName}
        temperature={hourlyForecast[0].temperature}
        conditionText={hourlyForecast[0].iconPhrase}
        maxTemperature={dailyForecast[0].temperature.maximum}
        minTemperature={dailyForecast[0].temperature.minimum}
      />

      <HourlyForecast hourlyForecast={hourlyForecast} />
      <DailyForecast dailyForecast={dailyForecast} />
    </div>
  );
}

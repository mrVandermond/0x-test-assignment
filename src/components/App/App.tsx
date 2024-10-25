import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  fetchCurrentWeather,
  fetchDailyForecast,
  fetchHourlyForecast,
  fetchLocationByGeolocation,
} from '../../api';
import { useGeolocation } from '../../hooks';
import { DAY_IN_MS, TEN_MINS_IN_MS, THIRTY_MINS_IN_MS } from '../../constants';
import { CurrentWeather } from '../CurrentWeather/CurrentWeather';
import { HourlyForecast } from '../HourlyForecast/HourlyForecast';
import { DailyForecast } from '../DailyForecast/DailyForecast';
import { Loader } from '../../icons/Loader';

import styles from './App.module.css';

export default function App() {
  const geolocationCoords = useGeolocation();

  const { data: location } = useQuery({
    staleTime: Infinity,
    queryKey: ['location', geolocationCoords],
    queryFn: () => fetchLocationByGeolocation(geolocationCoords?.latitude, geolocationCoords?.longitude),
    enabled: !!geolocationCoords,
  });
  const { data: currentWeather } = useQuery({
    staleTime: TEN_MINS_IN_MS,
    queryKey: ['currentWeather', location],
    queryFn: () => fetchCurrentWeather(location?.key),
    enabled: !!location,
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

  if (!location || !currentWeather || !hourlyForecast || !dailyForecast) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <CurrentWeather
        locationName={location.localizedName}
        temperature={currentWeather.temperature}
        conditionText={currentWeather.conditionText}
        maxTemperature={dailyForecast[0].roundedTemperature.maximum}
        minTemperature={dailyForecast[0].roundedTemperature.minimum}
      />

      <HourlyForecast
        hourlyForecast={hourlyForecast}
        currentWeather={currentWeather}
      />

      <DailyForecast
        dailyForecast={dailyForecast}
        currentTemperature={currentWeather.temperature}
      />
    </main>
  );
}

import React from 'react';

import {
  getCurrentWeatherQueryOptions,
  getDailyForecastQueryOptions,
  getHourlyForecastQueryOptions,
  useLocationQuery,
} from '../../api';
import {
  useGeolocation,
  useErrorSubscription,
  useInitialFetchingStatus,
  useFetchingStatus,
  useAdjustTemperatureRange,
  useBackground,
} from '../../hooks';
import { CurrentWeather } from '../CurrentWeather/CurrentWeather';
import { HourlyForecast } from '../HourlyForecast/HourlyForecast';
import { DailyForecast } from '../DailyForecast/DailyForecast';
import { GeolocationError } from '../GeolocationError/GeolocationError';
import { Error } from '../Error/Error'
import { Loader } from '../../icons/Loader';
import { BackgroundLoader } from '../BackgroundLoader/BackgroundLoader';

import styles from './App.module.css';

export default function App() {
  useBackground();

  const {
    coords,
    error: geolocationError,
    retryRequestGeolocation,
    isAwaitingGeolocation,
  } = useGeolocation();

  const { data: location, isFetching: isLocationFetching } = useLocationQuery(coords);
  const { error: apiError, handleRefetch } = useErrorSubscription();
  const isInitialFetching = useInitialFetchingStatus([
    getCurrentWeatherQueryOptions(location),
    getHourlyForecastQueryOptions(location),
    getDailyForecastQueryOptions(location),
  ]);
  const isFetching = useFetchingStatus([
    getCurrentWeatherQueryOptions(location),
    getHourlyForecastQueryOptions(location),
    getDailyForecastQueryOptions(location),
  ]);

  useAdjustTemperatureRange(isInitialFetching || isFetching, location);

  const isUpdating = isAwaitingGeolocation || isLocationFetching || isFetching;

  if (geolocationError && !coords) {
    return (
      <GeolocationError
        error={geolocationError}
        onRefetchGetGeolocation={retryRequestGeolocation}
      />
    )
  }

  if (apiError) {
    return (
      <Error
        error={apiError}
        hasButton
        buttonText="Refetch"
        onClick={handleRefetch}
      />
    )
  }

  if ((isAwaitingGeolocation && !coords) || isInitialFetching || !location) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      {isUpdating && <BackgroundLoader />}

      <CurrentWeather location={location}/>

      <HourlyForecast location={location}/>

      <DailyForecast location={location}/>
    </main>
  );
}

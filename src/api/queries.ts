import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';

import {
  CURRENT_WEATHER_QUERY_KEY,
  DAILY_FORECAST_QUERY_KEY,
  HOUR_IN_MS,
  HOURLY_FORECAST_QUERY_KEY,
  LOCATION_QUERY_KEY,
  TEN_MINS_IN_MS,
  THIRTY_MINS_IN_MS
} from '../constants';
import {
  currentHourlyForecastSelector,
  currentTemperatureSelector,
  temperatureRangeForeTodaySelector,
  temperatureRangeSelector,
} from './selectors';
import { GeolocationCoords } from '../types/geolocation';

import {
  fetchCurrentWeather,
  fetchDailyForecast,
  fetchHourlyForecast,
  fetchLocationByGeolocation,
} from './endpoints';
import { Location } from './types';

export const getLocationQueryOptions = (coords: GeolocationCoords | undefined) => queryOptions({
  staleTime: Infinity,
  queryKey: [LOCATION_QUERY_KEY, coords],
  queryFn: coords ? () => fetchLocationByGeolocation(coords.latitude, coords.longitude) : skipToken,
});

export const getCurrentWeatherQueryOptions = (location: Location | undefined) => queryOptions({
  staleTime: TEN_MINS_IN_MS,
  queryKey: [CURRENT_WEATHER_QUERY_KEY, location],
  queryFn: location ? () => fetchCurrentWeather(location.key) : skipToken,
});

export const getHourlyForecastQueryOptions = (location: Location | undefined) => queryOptions({
  staleTime: THIRTY_MINS_IN_MS,
  queryKey: [HOURLY_FORECAST_QUERY_KEY, location],
  queryFn: location ? () => fetchHourlyForecast(location.key) : skipToken,
});

export const getDailyForecastQueryOptions = (location: Location | undefined) => queryOptions({
  staleTime: HOUR_IN_MS,
  queryKey: [DAILY_FORECAST_QUERY_KEY, location],
  queryFn: location ? () => fetchDailyForecast(location.key) : skipToken,
});

export const useLocationQuery = (coords: GeolocationCoords | undefined) => {
  return useQuery(getLocationQueryOptions(coords));
};

export const useCurrentWeatherQuery = (location: Location) => {
  return useQuery(getCurrentWeatherQueryOptions(location));
};

export const useHourlyForecastQuery = (location: Location) => {
  return useQuery(getHourlyForecastQueryOptions(location));
};

export const useDailyForecastQuery = (location: Location) => {
  return useQuery(getDailyForecastQueryOptions(location));
};

export const useCurrentTemperatureQuery = (location: Location) => {
  return useQuery({
    ...getCurrentWeatherQueryOptions(location),
    select: currentTemperatureSelector,
  });
}

export const useTemperatureRangeQuery = (location: Location) => {
  return useQuery({
    ...getDailyForecastQueryOptions(location),
    select: temperatureRangeSelector,
  });
};

export const useTemperatureRangeForTodayQuery = (location: Location) => {
  return useQuery({
    ...getDailyForecastQueryOptions(location),
    select: temperatureRangeForeTodaySelector,
  });
};

export const useCurrentHourlyForecastQuery = (location: Location) => {
  return useQuery({
    ...getCurrentWeatherQueryOptions(location),
    select: currentHourlyForecastSelector,
  });
};

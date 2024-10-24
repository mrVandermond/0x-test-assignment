import { weatherFetcher } from './fetcher';
import {
  LocationSearchResponse,
  CurrentWeatherAPI,
  HourlyForecastAPI, DailyForecastsAPI, CurrentWeather, HourlyForecast, DailyForecast
} from './types';

export async function fetchLocationByGeoposition(lat?: number, lon?: number) {
  if (lat === undefined || lon === undefined) return;

  return weatherFetcher.fetch<LocationSearchResponse>('locations/v1/cities/geoposition/search', {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    q: `${lat},${lon}`,
  });
}

export async function fetchCurrentWeather(locationKey?: string): Promise<CurrentWeather | undefined> {
  if (!locationKey) return;

  const [data] = await weatherFetcher.fetch<CurrentWeatherAPI[]>(`/currentconditions/v1/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
  });

  return {
    ...data,
    temperature: Math.round(data.temperature.metric.value),
  };
}

export async function fetchHourlyForecast(locationKey?: string): Promise<HourlyForecast[] | undefined> {
  if (!locationKey) return;

  const data = await weatherFetcher.fetch<HourlyForecastAPI[]>(`/forecasts/v1/hourly/12hour/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    metric: true,
  });

  return data.map((item) => ({
    ...item,
    temperature: Math.round(item.temperature.value),
  }));
}

export async function fetchDailyForecast(locationKey?: string): Promise<DailyForecast[] | undefined> {
  if (!locationKey) return;

  const data = await weatherFetcher.fetch<DailyForecastsAPI>(`/forecasts/v1/daily/5day/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    metric: true,
    details: true,
  });

  return data.dailyForecasts.map((item) => ({
    ...item,
    temperature: { minimum: Math.round(item.temperature.minimum.value), maximum: Math.round(item.temperature.maximum.value) },
  }));
}

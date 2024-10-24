import { weatherFetcher } from './fetcher';
import { LocationSearchResponse, DailyForecasts, HourlyForecast } from './types';

export async function fetchLocationByGeoposition(lat?: number, lon?: number) {
  if (lat === undefined || lon === undefined) return;

  return weatherFetcher.fetch<LocationSearchResponse>('locations/v1/cities/geoposition/search', {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    q: `${lat},${lon}`,
  });
}

export async function fetchHourlyForecast(locationKey?: string) {
  if (!locationKey) return;

  const data = await weatherFetcher.fetch<HourlyForecast[]>(`/forecasts/v1/hourly/12hour/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    metric: true,
  });

  return data.map((item) => ({
    ...item,
    temperature: Math.round(item.temperature.value),
  }));
}

export async function fetchDailyForecast(locationKey?: string) {
  if (!locationKey) return;

  const data = await weatherFetcher.fetch<DailyForecasts>(`/forecasts/v1/daily/5day/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    metric: true,
  });

  return data.dailyForecasts.map((item) => ({
    ...item,
    temperature: { minimum: item.temperature.minimum.value, maximum: item.temperature.maximum.value },
  }));
}

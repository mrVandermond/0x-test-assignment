import { weatherFetcher } from './fetcher';
import {
  Location,
  CurrentWeatherAPI,
  HourlyForecastAPI,
  DailyForecastsAPI,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
} from './types';

export async function fetchLocationByGeolocation(lat?: number, lon?: number): Promise<Location | undefined> {
  if (lat === undefined || lon === undefined) return;

  const data = await weatherFetcher.fetch<Location>('locations/v1/cities/geoposition/search', {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    q: `${lat},${lon}`,
    toplevel: true,
  });

  return {
    key: data.key,
    localizedName: data.localizedName,
  };
}

export async function fetchCurrentWeather(locationKey?: string): Promise<CurrentWeather | undefined> {
  if (!locationKey) return;

  const [data] = await weatherFetcher.fetch<CurrentWeatherAPI[]>(`/currentconditions/v1/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
  });

  return {
    condition: data.weatherIcon,
    conditionText: data.weatherText,
    temperature: Math.round(data.temperature.metric.value),
  };
}

export async function fetchHourlyForecast(locationKey?: string): Promise<HourlyForecast[] | undefined> {
  if (!locationKey) return;

  const data = await weatherFetcher.fetch<HourlyForecastAPI[]>(`/forecasts/v1/hourly/24hour/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    metric: true,
  });
  const currentDateOfMonth = new Date().getDate();
  const lastForecastIndex = data.findIndex((forecast) => currentDateOfMonth !== (new Date(forecast.dateTime).getDate()));

  return data.slice(0, lastForecastIndex).map((item) => ({
    dateTime: item.dateTime,
    epochDateTime: item.epochDateTime * 1000,
    condition: item.weatherIcon,
    hasPrecipitation: item.hasPrecipitation,
    precipitationProbability: item.precipitationProbability,
    temperature: Math.round(item.temperature.value),
  }));
}

export async function fetchDailyForecast(locationKey?: string): Promise<DailyForecast[] | undefined> {
  if (!locationKey) return;

  const data = await weatherFetcher.fetch<DailyForecastsAPI>(`/forecasts/v1/daily/10day/${locationKey}`, {
    apikey: process.env.REACT_APP_WEATHER_API_KEY,
    metric: true,
    details: true,
  });

  return data.dailyForecasts.map((item) => ({
    day: {
      condition: item.day.icon,
      hasPrecipitation: item.day.hasPrecipitation,
      precipitationProbability: item.day.precipitationProbability,
      precipitationType: item.day.precipitationType,
    },
    epochDate: item.epochDate * 1000,
    temperature: {
      minimum: Math.floor(item.temperature.minimum.value),
      maximum: Math.ceil(item.temperature.maximum.value),
    },
  }));
}

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CurrentWeather, DailyForecast, Location } from '../api';
import { CURRENT_WEATHER_QUERY_KEY, DAILY_FORECAST_QUERY_KEY } from '../constants';

export const useAdjustTemperatureRange = (isLoading: boolean, isFetching: boolean, location: Location | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const currentWeatherQuery = queryClient.getQueryState<CurrentWeather | undefined>([
      CURRENT_WEATHER_QUERY_KEY,
      location,
    ]);
    const dailyForecast = queryClient.getQueryState<DailyForecast[] | undefined>([
      DAILY_FORECAST_QUERY_KEY,
      location,
    ]);

    if (currentWeatherQuery?.data?.temperature === undefined || !dailyForecast?.data) return;

    if (currentWeatherQuery.data.temperature < dailyForecast.data[0].temperature.minimum) {
      queryClient.setQueryData([DAILY_FORECAST_QUERY_KEY, location], [
        {
          ...dailyForecast.data[0],
          temperature: {
            minimum: currentWeatherQuery.data.temperature,
            maximum: dailyForecast.data[0].temperature.maximum,
          },
        },
        ...dailyForecast.data.slice(1),
      ]);
    }

    if (currentWeatherQuery.data.temperature > dailyForecast.data[0].temperature.maximum) {
      queryClient.setQueryData([DAILY_FORECAST_QUERY_KEY, location], [
        {
          ...dailyForecast.data[0],
          temperature: {
            minimum: dailyForecast.data[0].temperature.minimum,
            maximum: currentWeatherQuery.data.temperature,
          },
        },
        ...dailyForecast.data.slice(1),
      ]);
    }
  }, [queryClient, isFetching, isLoading, location]);
};

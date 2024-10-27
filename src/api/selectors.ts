import { CurrentWeather, DailyForecast, HourlyForecast } from './types';

export function currentTemperatureSelector(data: CurrentWeather | undefined) {
  if (!data) return;

  return data.temperature;
}

export function temperatureRangeSelector(data: DailyForecast[] | undefined) {
  if (!data) return;

  const min = data.reduce((acc, item) => {
    if (acc > item.temperature.minimum) {
      return item.temperature.minimum;
    }

    return acc;
  }, Infinity);
  const max = data.reduce((acc, item) => {
    if (acc < item.temperature.maximum) {
      return item.temperature.maximum;
    }

    return acc;
  }, -Infinity);

  return { min, max };
}

export function temperatureRangeForeTodaySelector(data: DailyForecast[] | undefined) {
  if (!data) return;

  return {
    min: data[0].temperature.minimum,
    max: data[0].temperature.maximum,
  };
}

export function currentHourlyForecastSelector(data: CurrentWeather | undefined): HourlyForecast | undefined {
  if (!data) return;

  return {
    precipitationProbability: null,
    hasPrecipitation: false,
    epochDateTime: new Date().valueOf(),
    temperature: data.temperature,
    condition: data.condition,
    dateTime: new Date().toUTCString(),
  };
}

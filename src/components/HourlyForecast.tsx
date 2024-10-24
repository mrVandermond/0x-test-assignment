import React, { FC, useMemo } from 'react';
import { CurrentWeather, HourlyForecast as THourlyForecast } from '../api';
import { getWeatherIconByCondition } from '../utils';

interface HourlyForecastProps {
  currentWeather: CurrentWeather;
  hourlyForecast: THourlyForecast[];
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { hour12: true, hour: 'numeric' });

export const HourlyForecast: FC<HourlyForecastProps> = ({ hourlyForecast, currentWeather }) => {
  const finalHourlyForecast = useMemo(() => ([
    {
      precipitationProbability: null,
      hasPrecipitation: false,
      epochDateTime: new Date().valueOf(),
      temperature: currentWeather.temperature,
      weatherIcon: currentWeather.weatherIcon,
    },
    ...hourlyForecast
  ]), [hourlyForecast, currentWeather]);

  return (
    <section className="hourly-forecast">
      <div className="forecast-title">HOURLY FORECAST</div>
      <div className="scroller">
        <div className="hourly-forecast-list">
          {finalHourlyForecast.map(({ epochDateTime, temperature, weatherIcon}, index) => (
            <div className="hourly-forecast-item" key={epochDateTime}>
              <div>{index === 0 ? 'Now' : dateFormatter.format(epochDateTime)}</div>
              <div>
                {getWeatherIconByCondition(weatherIcon)}
              </div>
              <div>{temperature}°</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

HourlyForecast.displayName = 'HourlyForecast';

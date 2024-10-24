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
      dateTime: new Date().toUTCString(),
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
          {finalHourlyForecast.map(({dateTime, temperature, weatherIcon}, index) => (
            <div className="hourly-forecast-item" key={dateTime}>
              <div>{index === 0 ? 'Now' : dateFormatter.format(new Date(dateTime))}</div>
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

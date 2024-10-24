import React, { FC } from 'react';
import { fetchHourlyForecast } from '../api';
import { getWeatherIconByCondition } from '../utils';

interface HourlyForecastProps {
  hourlyForecast: Exclude<Awaited<ReturnType<typeof fetchHourlyForecast>>, undefined>;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { hour12: true, hour: 'numeric' });

export const HourlyForecast: FC<HourlyForecastProps> = ({ hourlyForecast }) => {
  return (
    <section className="forecast">
      <div className="forecast-title">HOURLY FORECAST</div>
      <div className="scroller">
        <div className="forecast-list">
          {hourlyForecast.map(({dateTime, temperature, isDaylight, weatherIcon}, index) => (
            <div className="forecast-item" key={dateTime}>
              <span>{index === 0 ? 'Now' : dateFormatter.format(new Date(dateTime))}</span>
              <span>
                {getWeatherIconByCondition(weatherIcon)}
              </span>
              <span>{temperature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

HourlyForecast.displayName = 'HourlyForecast';

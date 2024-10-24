import React, { FC } from 'react';
import { fetchHourlyForecast } from '../api';
import { getWeatherIconByCondition } from '../utils';

interface HourlyForecastProps {
  hourlyForecast: Exclude<Awaited<ReturnType<typeof fetchHourlyForecast>>, undefined>;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { hour12: true, hour: 'numeric' });

export const HourlyForecast: FC<HourlyForecastProps> = ({ hourlyForecast }) => {
  return (
    <section className="hourly-forecast">
      <div className="forecast-title">HOURLY FORECAST</div>
      <div className="scroller">
        <div className="hourly-forecast-list">
          {hourlyForecast.map(({dateTime, temperature, isDaylight, weatherIcon}, index) => (
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

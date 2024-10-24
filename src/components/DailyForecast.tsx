import React, { FC } from 'react';
import { getWeatherIconByCondition } from '../utils';
import { fetchDailyForecast } from '../api';

interface DailyForecastProps {
  dailyForecast: Exclude<Awaited<ReturnType<typeof fetchDailyForecast>>, undefined>;
}

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export const DailyForecast: FC<DailyForecastProps> = ({ dailyForecast }) => {
  return (
    <section className="daily">
      <div className="daily-title">10-DAY FORECAST</div>
      <div className="daily-list">
        {dailyForecast.map(
          ({
             temperature,
             day,
             date,
           }, index) => (
            <div className="daily-row" key={date}>
              <div className="daily-time">{index === 0 ? 'Today' : dayFormatter.format(new Date(date))}</div>

              <div className="daily-conditions">
                {getWeatherIconByCondition(day.icon)}
                {day.hasPrecipitation && <span className="probability">{day.precipitationProbability}%</span>}
              </div>

              <div className="daily-range">
                <span className="daily-min">{temperature.minimum}°</span>
                <span className="range">
                    <span className="range-meter"/>
                    <span className="range-current"/>
                  </span>
                <span className="daily-max">{temperature.maximum}°</span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

DailyForecast.displayName = 'DailyForecast';

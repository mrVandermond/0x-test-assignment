import React, { FC } from 'react';
import { getWeatherIconByCondition } from '../utils';
import { fetchDailyForecast } from '../api';

interface DailyForecastProps {
  dailyForecast: Exclude<Awaited<ReturnType<typeof fetchDailyForecast>>, undefined>;
}

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export const DailyForecast: FC<DailyForecastProps> = ({ dailyForecast }) => {
  return (
    <section className="daily-forecast">
      <div className="forecast-title">10-DAY FORECAST</div>
      <div>
        {dailyForecast.map(
          ({
             temperature,
             day,
             date,
           }, index) => (
            <div className="daily-forecast-row" key={date}>
              <div className="daily-time">{index === 0 ? 'Today' : dayFormatter.format(new Date(date))}</div>

              <div className="daily-forecast-conditions">
                {getWeatherIconByCondition(day.icon)}
                {day.hasPrecipitation && <div className="probability">{day.precipitationProbability}%</div>}
              </div>

              <div className="daily-forecast-range">
                <span className="daily-temperature-min">{temperature.minimum}°</span>
                <span className="range">
                    <span className="range-meter"/>
                    <span className="range-current"/>
                  </span>
                <span className="daily-temperature-max">{temperature.maximum}°</span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

DailyForecast.displayName = 'DailyForecast';

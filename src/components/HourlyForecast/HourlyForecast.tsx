import React, { FC, useMemo } from 'react';

import { CurrentWeather, HourlyForecast as THourlyForecast } from '../../api';
import { getWeatherIconByCondition } from '../../utils';
import { ForecastTitle } from '../ForecastTitle/ForecastTitle';

import styles from './HourlyForecast.module.css';

interface HourlyForecastProps {
  currentWeather: CurrentWeather;
  hourlyForecast: THourlyForecast[];
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { hour12: true, hour: 'numeric' });

export const HourlyForecast: FC<HourlyForecastProps> = ({ hourlyForecast, currentWeather }) => {
  const finalHourlyForecast = useMemo<THourlyForecast[]>(() => ([
    {
      precipitationProbability: null,
      hasPrecipitation: false,
      epochDateTime: new Date().valueOf(),
      temperature: currentWeather.temperature,
      condition: currentWeather.condition,
      dateTime: new Date().toUTCString(),
    },
    ...hourlyForecast
  ]), [hourlyForecast, currentWeather]);

  return (
    <section className={styles.hourlyForecast}>
      <ForecastTitle>hourly forecast</ForecastTitle>
      <div className={styles.scroller}>
        <div className={styles.hourlyForecastList}>
          {finalHourlyForecast.map(({ epochDateTime, temperature, condition }, index) => (
            <div className={styles.hourlyForecastItem} key={epochDateTime}>
              <div>{index === 0 ? 'Now' : dateFormatter.format(epochDateTime)}</div>
              <div>
                {getWeatherIconByCondition(condition)}
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

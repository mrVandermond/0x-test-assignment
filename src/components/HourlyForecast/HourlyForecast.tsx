import React, { FC, memo, useMemo } from 'react';

import {
  HourlyForecast as THourlyForecast,
  Location, useCurrentHourlyForecastQuery, useHourlyForecastQuery
} from '../../api';
import { getWeatherIconByCondition } from '../../utils';
import { ForecastTitle } from '../ForecastTitle/ForecastTitle';

import styles from './HourlyForecast.module.css';

interface HourlyForecastProps {
  location: Location;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { hour12: true, hour: 'numeric' });

export const HourlyForecast: FC<HourlyForecastProps> = memo(({ location }) => {
  const { data: hourlyForecast } = useHourlyForecastQuery(location);
  const { data: currentHourlyForecast } = useCurrentHourlyForecastQuery(location);

  const finalHourlyForecast = useMemo<THourlyForecast[]>(() => {
    if (!currentHourlyForecast || !hourlyForecast) return [];

    return [currentHourlyForecast, ...hourlyForecast];
  }, [hourlyForecast, currentHourlyForecast]);

  if (!hourlyForecast || !currentHourlyForecast) return null;

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
});

HourlyForecast.displayName = 'HourlyForecast';

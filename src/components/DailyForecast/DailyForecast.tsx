import React, { FC, memo } from 'react';

import {
  Location,
  useCurrentTemperatureQuery,
  useDailyForecastQuery,
  useTemperatureRangeQuery,
} from '../../api';
import { DailyForecastItem } from '../DailyForecastItem/DailyForecastItem';
import { ForecastTitle } from '../ForecastTitle/ForecastTitle';

import styles from './DailyForecast.module.css';

interface DailyForecastProps {
  location: Location;
}

export const DailyForecast: FC<DailyForecastProps> = memo(({ location }) => {
  const { data: dailyForecast } = useDailyForecastQuery(location);
  const { data: currentTemperature } = useCurrentTemperatureQuery(location);
  const { data: temperatureRange } = useTemperatureRangeQuery(location);

  if (!dailyForecast || currentTemperature === undefined || !temperatureRange) return null;

  return (
    <section className={styles.dailyForecast}>
      <ForecastTitle>10-day forecast</ForecastTitle>
      {dailyForecast.map(
        (dailyForecastItem, index) => (
          <DailyForecastItem
            key={dailyForecastItem.epochDate}
            dailyForecastItem={dailyForecastItem}
            minTemperature={temperatureRange.min}
            maxTemperature={temperatureRange.max}
            currentTemperature={currentTemperature}
            isToday={index === 0}
          />
        )
      )}
    </section>
  );
});

DailyForecast.displayName = 'DailyForecast';

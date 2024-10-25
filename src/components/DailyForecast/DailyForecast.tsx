import React, { FC, useMemo } from 'react';

import { DailyForecast as TDailyForecast } from '../../api';

import { DailyForecastItem } from '../DailyForecastItem/DailyForecastItem';
import { ForecastTitle } from '../ForecastTitle/ForecastTitle';

import styles from './DailyForecast.module.css';

interface DailyForecastProps {
  dailyForecast: TDailyForecast[];
  currentTemperature: number;
}

export const DailyForecast: FC<DailyForecastProps> = ({ dailyForecast, currentTemperature }) => {
  const minTemperature = useMemo(() => {
    return dailyForecast.reduce((acc, item) => {
      if (acc > item.temperature.minimum) {
        return item.temperature.minimum;
      }

      return acc;
    }, Infinity);
  }, []);
  const maxTemperature = useMemo(() => {
    return dailyForecast.reduce((acc, item) => {
      if (acc < item.temperature.maximum) {
        return item.temperature.maximum;
      }

      return acc;
    }, -Infinity);
  }, [dailyForecast]);

  return (
    <section className={styles.dailyForecast}>
      <ForecastTitle>10-day forecast</ForecastTitle>
      {dailyForecast.map(
        (dailyForecastItem, index) => (
          <DailyForecastItem
            key={dailyForecastItem.epochDate}
            dailyForecastItem={dailyForecastItem}
            minTemperature={minTemperature}
            maxTemperature={maxTemperature}
            currentTemperature={currentTemperature}
            isToday={index === 0}
          />
        )
      )}
    </section>
  );
};

DailyForecast.displayName = 'DailyForecast';

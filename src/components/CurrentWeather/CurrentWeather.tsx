import React, { FC, memo } from 'react';

import { Location, useCurrentWeatherQuery, useTemperatureRangeForTodayQuery } from '../../api';

import styles from './CurrentWeather.module.css';

interface CurrentWeatherProps {
  location: Location;
}

export const CurrentWeather: FC<CurrentWeatherProps> = memo(({ location }) => {
  const { data: currentWeather } = useCurrentWeatherQuery(location);
  const { data: temperatureRange } = useTemperatureRangeForTodayQuery(location);

  if (!currentWeather || !temperatureRange) return null;

  return (
    <section className={styles.header}>
      <div className={styles.location}>{location.localizedName}</div>
      <div className={styles.temperature}>{currentWeather.temperature}°</div>
      <div className={styles.condition}>
        <span>{currentWeather.conditionText}</span>
        <div>H:{temperatureRange.max}° L:{temperatureRange.min}°</div>
      </div>
    </section>
  );
});

CurrentWeather.displayName = 'CurrentWeather';

import React, { FC } from 'react';

import styles from './CurrentWeather.module.css';

interface CurrentWeatherProps {
  locationName: string;
  temperature: number;
  conditionText: string;
  maxTemperature: number;
  minTemperature: number;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({ locationName, temperature, conditionText, maxTemperature, minTemperature }) => {
  return (
    <header className={styles.header}>
      <div className={styles.location}>{locationName}</div>
      <div className={styles.temperature}>{temperature}°</div>
      <div className={styles.condition}>
        <span>{conditionText}</span>
        <div>H:{maxTemperature}° L:{minTemperature}°</div>
      </div>
    </header>
  )
};

CurrentWeather.displayName = 'CurrentWeather';

import React, { FC, useMemo } from 'react';

import { DailyForecast } from '../../api';
import { getTemperatureOffsets, getWeatherIconByCondition } from '../../utils';

import { CurrentTemperatureDot } from '../CurrentTemperatureDot/CurrentTemperatureDot';

import styles from './DailyForecastItem.module.css';

interface DailyForecastItemProps {
  dailyForecastItem: DailyForecast;
  minTemperature: number;
  maxTemperature: number;
  currentTemperature: number;
  isToday: boolean;
}

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export const DailyForecastItem: FC<DailyForecastItemProps> = ({
  dailyForecastItem,
  minTemperature,
  maxTemperature,
  isToday,
  currentTemperature,
}) => {
  const rangeMeterStyles = useMemo(() => {
    const offset = getTemperatureOffsets(
      minTemperature,
      maxTemperature,
      dailyForecastItem.temperature.minimum,
      dailyForecastItem.temperature.maximum,
    );

    return {
      left: `${offset.leftOffset}%`,
      right: `${offset.rightOffset}%`,
    };
  }, [minTemperature, maxTemperature, dailyForecastItem]);

  return (
    <div className={styles.dailyForecastRow}>
      <div>{isToday ? 'Today' : dayFormatter.format(dailyForecastItem.epochDate)}</div>

      <div className={styles.dailyForecastConditions}>
        {getWeatherIconByCondition(dailyForecastItem.day.condition, dailyForecastItem.day.precipitationType)}
        {dailyForecastItem.day.hasPrecipitation && (
          <div className={styles.probability}>{dailyForecastItem.day.precipitationProbability}%</div>
        )}
      </div>

      <div className={styles.dailyForecastRange}>
        <div className={styles.dailyTemperatureMin}>{dailyForecastItem.temperature.minimum}°</div>
        <div className={styles.range}>
          <div className={styles.rangeMeter} style={rangeMeterStyles}/>
          {isToday && (
            <CurrentTemperatureDot
              currentTemperature={currentTemperature}
              minTemperature={minTemperature}
              maxTemperature={maxTemperature}
            />
          )}
        </div>
        <div className={styles.dailyTemperatureMax}>{dailyForecastItem.temperature.maximum}°</div>
      </div>
    </div>
  )
};

DailyForecastItem.displayName = 'DailyForecastItem';

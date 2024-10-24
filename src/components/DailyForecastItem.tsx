import React, { FC, useMemo } from 'react';

import { DailyForecast } from '../api';
import { getTemperatureOffsets, getWeatherIconByCondition } from '../utils';

import { CurrentTemperatureDot } from './CurrentTemperatureDot';

interface DailyForecastItemProps {
  dailyForecastItem: DailyForecast;
  minTemperature: number;
  maxTemperature: number;
  currentTemperature: number;
  isToday: boolean;
}

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export const DailyForecastItem: FC<DailyForecastItemProps> = ({ dailyForecastItem, minTemperature, maxTemperature, isToday, currentTemperature }) => {
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
    <div className="daily-forecast-row">
      <div className="daily-time">{isToday ? 'Today' : dayFormatter.format(dailyForecastItem.epochDate)}</div>

      <div className="daily-forecast-conditions">
        {getWeatherIconByCondition(dailyForecastItem.day.icon)}
        {dailyForecastItem.day.hasPrecipitation && (
          <div className="probability">{dailyForecastItem.day.precipitationProbability}%</div>
        )}
      </div>

      <div className="daily-forecast-range">
        <div className="daily-temperature-min">{dailyForecastItem.roundedTemperature.minimum}°</div>
        <div className="range">
          <div className="range-meter" style={rangeMeterStyles}/>
          {isToday && (
            <CurrentTemperatureDot
              currentTemperature={currentTemperature}
              minTemperature={minTemperature}
              maxTemperature={maxTemperature}
            />
          )}
        </div>
        <div className="daily-temperature-max">{dailyForecastItem.roundedTemperature.maximum}°</div>
      </div>
    </div>
  )
};

DailyForecastItem.displayName = 'DailyForecastItem';

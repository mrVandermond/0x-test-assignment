import React, { FC } from 'react';

interface CurrentWeatherProps {
  locationName: string;
  temperature: number;
  conditionText: string;
  maxTemperature: number;
  minTemperature: number;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({ locationName, temperature, conditionText, maxTemperature, minTemperature }) => {
  return (
    <header className="header">
      <div className="location">{locationName}</div>
      <div className="temp">{temperature}°</div>
      <div className="conditions">
        <span>{conditionText}</span>
        <div>H:{maxTemperature} L:{minTemperature}</div>
      </div>
    </header>
  )
};

CurrentWeather.displayName = 'CurrentWeather';

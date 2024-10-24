import React from 'react';
import './style.css';

import { Thunder } from './weather/Thunder';
import { Rain } from './weather/Rain';

import { fetchDailyForecast, fetchHourlyForecast, fetchLocationByGeoposition } from './api';
import { useQuery } from '@tanstack/react-query';
import { useGeolocation } from './hooks';

const dateFormatter = new Intl.DateTimeFormat('en-US', { hour12: true, hour: 'numeric' });
const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export default function App() {
  const geolocationCoords = useGeolocation();

  const { data: location } = useQuery({
    staleTime: Infinity,
    queryKey: ['location', geolocationCoords],
    queryFn: () => fetchLocationByGeoposition(geolocationCoords?.latitude, geolocationCoords?.longitude),
    enabled: !!geolocationCoords,
  });
  const { data: hourlyForecast } = useQuery({
    staleTime: 30 * 1000,
    queryKey: ['hourlyForecast', location],
    queryFn: () => fetchHourlyForecast(location?.key),
    enabled: !!location,
  });
  const { data: dailyForecast } = useQuery({
    staleTime: 24 * 60 * 1000,
    queryKey: ['dailyForecast', location],
    queryFn: () => fetchDailyForecast(location?.key),
    enabled: !!location,
  });

  return (
    <div>
      <div className="header">
        <div className="location">{location?.localizedName}</div>
        <div className="temp">{hourlyForecast?.[0].temperature}</div>
        <div className="conditions">
          {hourlyForecast?.[0].iconPhrase}
          <br />
          H:{dailyForecast?.[0].temperature.maximum} L:{dailyForecast?.[0].temperature.minimum}
        </div>
      </div>

      <div className="forecast">
        <div className="forecast-title">HOURLY FORECAST</div>
        <div className="scroller">
          <div className="forecast-list">
            {hourlyForecast?.map(({ dateTime, temperature }, index) => (
              <div className="forecast-item" key={dateTime}>
                <span>{index === 0 ? 'Now' : dateFormatter.format(new Date(dateTime))}</span>
                <span>
                  <Thunder />
                </span>
                <span>{temperature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="daily">
        <div className="daily-title">10-DAY FORECAST</div>
        <div className="daily-list">
          {dailyForecast?.map(
            ({
              temperature,
              day,
              date: date
            }, index) => (
              <div className="daily-row">
                <div className="daily-time">{index === 0 ? 'Today' : dayFormatter.format(new Date(date))}</div>

                <div className="daily-conditions">
                  <Rain />
                  <span className="probability">60%</span>
                </div>

                <div className="daily-range">
                  <span className="daily-min">{temperature.minimum}°</span>
                  <span className="range">
                    <span className="range-meter" />
                    <span className="range-current" />
                  </span>
                  <span className="daily-max">{temperature.maximum}°</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

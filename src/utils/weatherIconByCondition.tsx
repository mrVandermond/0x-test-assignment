import React from 'react';

import { WeatherCondition } from '../api';
import { Sunny } from '../weather/Sunny';
import { PartlyCloudy } from '../weather/PartlyCloudy';
import { Thunder } from '../weather/Thunder';
import { Rain } from '../weather/Rain';
import { NightCloudy } from '../weather/NightCloudy';
import { Fog } from '../weather/Fog';
import { HazySunshine } from '../weather/HazySunshine';
import { Windy } from '../weather/Windy';
import { Cloudy } from '../weather/Cloudy';
import { Snow } from '../weather/Snow';
import { HeavyRain } from '../weather/HeavyRain';
import { HeavySnow } from '../weather/HeavySnow';
import { HazyMoon } from '../weather/HazyMoon';
import { Sleet } from '../weather/Sleet';
import { NightClear } from '../weather/NightClear';
import { Icy } from '../weather/Icy';

const weatherConditionIconMap = {
  [WeatherCondition.Sunny]: <Sunny />,
  [WeatherCondition.MostlySunny]: <Sunny />,
  [WeatherCondition.PartlySunny]: <PartlyCloudy />,
  [WeatherCondition.IntermittentClouds]: <PartlyCloudy />,
  [WeatherCondition.HazySunshine]: <HazySunshine />,
  [WeatherCondition.MostlyCloudy]: <Cloudy />,
  [WeatherCondition.Cloudy]: <Cloudy />,
  [WeatherCondition.Dreary]: <Cloudy />,
  [WeatherCondition.Fog]: <Fog />,
  [WeatherCondition.Showers]: <HeavyRain />,
  [WeatherCondition.MostlyCloudyShowers]: <HeavyRain />,
  [WeatherCondition.PartlySunnyShowers]: <HeavyRain />,
  [WeatherCondition.ThunderStorms]: <Thunder />,
  [WeatherCondition.MostlyCloudyThunderStorms]: <Thunder />,
  [WeatherCondition.PartlySunnyThunderStorms]: <Thunder />,
  [WeatherCondition.Rain]: <Rain />,
  [WeatherCondition.Flurries]: <HeavySnow />,
  [WeatherCondition.MostlyCloudyFlurries]: <HeavySnow />,
  [WeatherCondition.PartlySunnyFlurries]: <HeavySnow />,
  [WeatherCondition.Snow]: <Snow />,
  [WeatherCondition.MostlyCloudySnow]: <Snow />,
  [WeatherCondition.Ice]: <Icy />,
  [WeatherCondition.Sleet]: <Sleet />,
  [WeatherCondition.FreezingRain]: <Sleet />,
  [WeatherCondition.RainAndSnow]: <Sleet />,
  [WeatherCondition.Windy]: <Windy />,
  [WeatherCondition.NightClear]: <NightClear />,
  [WeatherCondition.NightMostlyClear]: <NightClear />,
  [WeatherCondition.NightPartlyCloudy]: <NightCloudy />,
  [WeatherCondition.NightIntermittentClouds]: <NightCloudy />,
  [WeatherCondition.HazyMoonlight]: <HazyMoon />,
  [WeatherCondition.NightMostlyCloudy]: <Cloudy />,
  [WeatherCondition.PartlyCloudyShowers]: <HeavyRain />,
  [WeatherCondition.NightMostlyCloudyShowers]: <HeavyRain />,
  [WeatherCondition.PartlyCloudyThunderStorms]: <Thunder />,
  [WeatherCondition.NightMostlyCloudyThunderStorms]: <Thunder />,
  [WeatherCondition.NightMostlyCloudyFlurries]: <HeavySnow />,
  [WeatherCondition.NightMostlyCloudySnow]: <Snow />,
};

export function getWeatherIconByCondition(condition: WeatherCondition) {
  return weatherConditionIconMap[condition];
}

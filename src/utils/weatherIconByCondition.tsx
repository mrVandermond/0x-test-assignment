import React from 'react';

import { WeatherCondition } from '../api';
import { Sunny } from '../icons/Sunny';
import { PartlyCloudy } from '../icons/PartlyCloudy';
import { Thunder } from '../icons/Thunder';
import { Rain } from '../icons/Rain';
import { NightCloudy } from '../icons/NightCloudy';
import { Fog } from '../icons/Fog';
import { HazySunshine } from '../icons/HazySunshine';
import { Windy } from '../icons/Windy';
import { Cloudy } from '../icons/Cloudy';
import { Snow } from '../icons/Snow';
import { HeavyRain } from '../icons/HeavyRain';
import { HeavySnow } from '../icons/HeavySnow';
import { HazyMoon } from '../icons/HazyMoon';
import { Sleet } from '../icons/Sleet';
import { NightClear } from '../icons/NightClear';
import { Icy } from '../icons/Icy';

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

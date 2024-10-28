import React from 'react';

import { PrecipitationType, WeatherCondition } from '../api';
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
import { LightRain } from '../icons/LightRain';

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
  [WeatherCondition.Showers]: <LightRain />,
  [WeatherCondition.MostlyCloudyShowers]: <HeavyRain />,
  [WeatherCondition.PartlySunnyShowers]: <LightRain />,
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
  [WeatherCondition.PartlyCloudyShowers]: <LightRain />,
  [WeatherCondition.NightMostlyCloudyShowers]: <HeavyRain />,
  [WeatherCondition.PartlyCloudyThunderStorms]: <Thunder />,
  [WeatherCondition.NightMostlyCloudyThunderStorms]: <Thunder />,
  [WeatherCondition.NightMostlyCloudyFlurries]: <HeavySnow />,
  [WeatherCondition.NightMostlyCloudySnow]: <Snow />,
};

const weatherPrecipitationIconMap = {
  [PrecipitationType.Rain]: <Rain />,
  [PrecipitationType.Snow]: <Snow />,
  [PrecipitationType.Ice]: <Icy/>,
  [PrecipitationType.Mixed]: <Sleet />,
};

/**
 * Returns weather condition icon in accordance with passed condition type and precipitation type
 * @param conditionType - weather condition type
 * @param precipitationType - weather precipitation type
 */
export function getWeatherIconByCondition(conditionType: WeatherCondition, precipitationType?: PrecipitationType) {
  if (precipitationType) {
    return weatherPrecipitationIconMap[precipitationType];
  }

  return weatherConditionIconMap[conditionType];
}

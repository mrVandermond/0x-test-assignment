export interface LocationSearchResponse {
  key: string;
  localizedName: string;
}

interface BaseForecast {
  hasPrecipitation: boolean;
  precipitationProbability: number;
}

interface BaseTemperature {
  value: number;
}

export enum WeatherCondition {
  Sunny = 1,
  MostlySunny,
  PartlySunny,
  IntermittentClouds,
  HazySunshine,
  MostlyCloudy,
  Cloudy,
  Dreary,
  Fog = 11,
  Showers,
  MostlyCloudyShowers,
  PartlySunnyShowers,
  ThunderStorms,
  MostlyCloudyThunderStorms,
  PartlySunnyThunderStorms,
  Rain,
  Flurries,
  MostlyCloudyFlurries,
  PartlySunnyFlurries,
  Snow,
  MostlyCloudySnow,
  Ice,
  Sleet,
  FreezingRain,
  RainAndSnow = 29,
  Windy = 32,
  NightClear,
  NightMostlyClear,
  NightPartlyCloudy,
  NightIntermittentClouds,
  HazyMoonlight,
  NightMostlyCloudy,
  PartlyCloudyShowers,
  NightMostlyCloudyShowers,
  PartlyCloudyThunderStorms,
  NightMostlyCloudyThunderStorms,
  NightMostlyCloudyFlurries,
  NightMostlyCloudySnow,
}

export interface HourlyForecast extends BaseForecast {
  dateTime: string;
  temperature: BaseTemperature;
  weatherIcon: WeatherCondition;
  iconPhrase: string;
  isDaylight: boolean;
}

export interface DailyForecasts {
  dailyForecasts: DailyForecast[];
}

export interface DailyForecast {
  date: string;
  temperature: {
    minimum: BaseTemperature;
    maximum: BaseTemperature;
  };
  day: BaseForecast & {
    icon: WeatherCondition;
  };
}

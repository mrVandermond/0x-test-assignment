export interface LocationSearchResponse {
  key: string;
  localizedName: string;
}

interface BaseForecast {
  hasPrecipitation: boolean;
  precipitationProbability: number | null;
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

export interface CurrentWeatherAPI {
  weatherText: string;
  weatherIcon: WeatherCondition;
  temperature: {
    metric: BaseTemperature;
  };
}

export type CurrentWeather = Omit<CurrentWeatherAPI, 'temperature'> & { temperature: number };

export interface HourlyForecastAPI extends BaseForecast {
  dateTime: string;
  temperature: BaseTemperature;
  weatherIcon: WeatherCondition;
}

export type HourlyForecast = Omit<HourlyForecastAPI, 'temperature'> & { temperature: number };

export interface DailyForecastsAPI {
  dailyForecasts: DailyForecastAPI[];
}

export interface DailyForecastAPI {
  date: string;
  temperature: {
    minimum: BaseTemperature;
    maximum: BaseTemperature;
  };
  day: BaseForecast & {
    icon: WeatherCondition;
  };
}

export type DailyForecast = Omit<DailyForecastAPI, 'temperature'> & {
  temperature: {
    minimum: number;
    maximum: number;
  };
};

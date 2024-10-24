export interface LocationSearchResponse {
  key: string;
  localizedName: string;
}

interface BaseForecast {
  hasPrecipitation: boolean;
  precipitationProbability: number;
  precipitationType: PrecipitationType | null;
}

interface BaseTemperature {
  value: number;
}

export enum PrecipitationType {
  Rain = 'Rain',
}

export interface HourlyForecast extends BaseForecast {
  dateTime: string;
  temperature: BaseTemperature;
  iconPhrase: string;
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
    icon: number;
  };
}

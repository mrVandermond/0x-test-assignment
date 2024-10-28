export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      REACT_APP_WEATHER_API_KEY: string;
    }
  }
}

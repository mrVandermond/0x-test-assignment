import { weatherResponseFormatter } from './utils';

class Fetcher {
  private readonly baseURL: string;
  private readonly responseFormatter?: (responseData: unknown) => any;

  constructor(baseURL: string, responseFormatter?: (responseData: unknown) => any) {
    this.baseURL = baseURL;

    if (responseFormatter) {
      this.responseFormatter = responseFormatter;
    }
  }

  private buildURL(path: string, params?: Record<string, unknown>) {
    const url = new URL(path, this.baseURL);

    for (const [key, value] of Object.entries(params ?? {})) {
      if (value === undefined || value === null) continue;

      url.searchParams.append(key, String(value));
    }

    return url.toString();
  }

  public async fetch<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response = await fetch(this.buildURL(path, params));

      if (!response.ok) {
        return Promise.reject(new Error(response.statusText));
      }

      const data = await response.json();

      if (this.responseFormatter) {
        return this.responseFormatter(data);
      }

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export const weatherFetcher = new Fetcher('https://dataservice.accuweather.com', weatherResponseFormatter);

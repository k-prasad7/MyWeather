import { WeatherData, CachedWeatherData, WeatherForecast, CachedForecastData } from '../types/weather';

const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

export function getCachedWeather(city: string): WeatherData | null {
  return getCachedData<WeatherData>(`weather_${city}`);
}

export function setCachedWeather(city: string, data: WeatherData): void {
  setCachedData(`weather_${city}`, data);
}

export function getCachedForecast(city: string): WeatherForecast[] | null {
  return getCachedData<WeatherForecast[]>(`forecast_${city}`);
}

export function setCachedForecast(city: string, data: WeatherForecast[]): void {
  setCachedData(`forecast_${city}`, data);
}

function getCachedData<T>(key: string): T | null {
  try {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const { data, timestamp }: CachedWeatherData | CachedForecastData = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data as T;
      }
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
}

export function clearWeatherCache(): void {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('weather_') || key.startsWith('forecast_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

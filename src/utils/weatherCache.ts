interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  weatherId: number;
  humidity: number;
  windSpeed: number;
}

interface CachedWeatherData {
  data: WeatherData;
  timestamp: number;
}

const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

export function getCachedWeather(city: string): WeatherData | null {
  try {
    const cachedData = localStorage.getItem(`weather_${city}`);
    if (cachedData) {
      const { data, timestamp }: CachedWeatherData = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  return null;
}

export function setCachedWeather(city: string, data: WeatherData): void {
  try {
    const cacheData: CachedWeatherData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`weather_${city}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
}

export function clearWeatherCache(): void {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('weather_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

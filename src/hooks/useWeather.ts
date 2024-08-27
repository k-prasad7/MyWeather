import { useState, useEffect, useCallback } from 'react';
import { WeatherData, GeocodingResult, WeatherState, WeatherError } from '../types/weather';
import { getCachedWeather, setCachedWeather } from '../utils/weatherCache';
import { processWeatherError } from '../utils/errorUtils';
import { API_KEY } from '../config/constants';

export const useWeather = () => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null
  });
  const [city, setCity] = useState<string>('');

  const fetchWeather = useCallback(async () => {
    if (!city) return;

    setWeatherState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Check cache first
      const cachedData = getCachedWeather(city);
      if (cachedData) {
        setWeatherState({ data: cachedData, loading: false, error: null });
        return;
      }

      // If not in cache or cache is expired, fetch from API
      const coordsResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
      );
      if (!coordsResponse.ok) {
        throw new Error(`Geocoding API error! status: ${coordsResponse.status}`);
      }
      const coordsData: GeocodingResult[] = await coordsResponse.json();
      
      if (!coordsData || coordsData.length === 0) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }
      
      const { lat, lon, name } = coordsData[0];
      
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
      );
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error! status: ${weatherResponse.status}`);
      }
      const weatherData = await weatherResponse.json();
      
      const newWeatherData: WeatherData = {
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        city: name,
        weatherId: weatherData.weather[0].id,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
      };

      setWeatherState({ data: newWeatherData, loading: false, error: null });
      setCachedWeather(city, newWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      const processedError = processWeatherError(error);
      setWeatherState(prev => ({ ...prev, loading: false, error: processedError, data: null }));
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const handleSearch = useCallback((searchCity: string) => {
    setCity(searchCity.trim());
  }, []);

  const resetWeather = useCallback(() => {
    setWeatherState({ data: null, loading: false, error: null });
    setCity('');
  }, []);

  return { ...weatherState, handleSearch, resetWeather };
};

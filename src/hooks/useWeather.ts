import { useState, useEffect } from 'react';
import { WeatherData, GeocodingResult } from '../types/weather';
import { getCachedWeather, setCachedWeather } from '../utils/weatherCache';
import { API_KEY } from '../config/constants';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cachedData = getCachedWeather(city);
      if (cachedData) {
        setWeather(cachedData);
        setLoading(false);
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

      setWeather(newWeatherData);
      setCachedWeather(city, newWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity.trim());
  };

  const resetWeather = () => {
    setWeather(null);
    setCity('');
    setError(null);
  };

  return { weather, loading, error, handleSearch, resetWeather };
};

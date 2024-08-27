import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherData, WeatherError, WeatherForecast, ForecastResponse, RootState } from '../types/weather';
import { API_KEY } from '../config/constants';
import { processWeatherError } from '../utils/errorUtils';
import { getCachedWeather, setCachedWeather, getCachedForecast, setCachedForecast } from '../utils/weatherCache';

// Action Creators
export const resetWeather = createAction('weather/reset');

// Async Thunk Action
export const fetchWeatherAndForecast = createAsyncThunk<
  { currentWeather: WeatherData; forecast: WeatherForecast[] },
  string,
  { state: RootState; rejectValue: WeatherError }
>('weather/fetchWeatherAndForecast', async (city, { rejectWithValue }) => {
  try {
    // Check cache first
    const cachedWeather = getCachedWeather(city);
    const cachedForecast = getCachedForecast(city);

    if (cachedWeather && cachedForecast) {
      return { currentWeather: cachedWeather, forecast: cachedForecast };
    }

    // Fetch coordinates
    const coordsResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    if (!coordsResponse.ok) {
      throw new Error(`Geocoding API error! status: ${coordsResponse.status}`);
    }
    const coordsData = await coordsResponse.json();
    
    if (!coordsData || coordsData.length === 0) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    }
    
    const { lat, lon, name } = coordsData[0];
    
    // Fetch current weather
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

    // Fetch forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error! status: ${forecastResponse.status}`);
    }
    const forecastData: ForecastResponse = await forecastResponse.json();
    
    setCachedWeather(city, newWeatherData);
    setCachedForecast(city, forecastData.list);

    return { currentWeather: newWeatherData, forecast: forecastData.list };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return rejectWithValue(processWeatherError(error));
  }
});

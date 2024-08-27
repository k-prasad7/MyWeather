import React, { useState, useEffect } from 'react';
import { Stack, Title, TextInput, Button, Text, Paper, Alert, Center, Group } from '@mantine/core';
import { IconAlertCircle, IconDroplet, IconWind } from '@tabler/icons-react';
import { getCachedWeather, setCachedWeather, clearWeatherCache } from '../utils/weatherCache';

interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  weatherId: number;
  humidity: number;
  windSpeed: number;
}

interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const WeatherIcon: React.FC<{ iconClass: string }> = ({ iconClass }) => (
  <i className={`wi ${iconClass}`} style={{ fontSize: '2rem' }} />
);

function getWeatherIconClass(weatherId: number): string {
  if (weatherId >= 200 && weatherId < 300) return 'wi-thunderstorm';
  if (weatherId >= 300 && weatherId < 400) return 'wi-sprinkle';
  if (weatherId >= 500 && weatherId < 600) return 'wi-rain';
  if (weatherId >= 600 && weatherId < 700) return 'wi-snow';
  if (weatherId >= 700 && weatherId < 800) return 'wi-fog';
  if (weatherId === 800) return 'wi-day-sunny';
  if (weatherId > 800) return 'wi-cloudy';
  return 'wi-na';
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>(''); // Changed initial state to empty string
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  const apiKey = 'c90705a73d543fbf9d21ada91a8961b2';

  const fetchWeather = async () => {
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
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
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
    if (city) { // Only fetch weather when city is not an empty string
      fetchWeather();
    }
  }, [city]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleClearCache = () => {
    clearWeatherCache();
    setWeather(null);
    setCity('');
    setSearchInput('');
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Stack gap="md" align="center" style={{ width: '100%', maxWidth: 400 }}>
      <Title order={1}>MyWeather</Title>
      
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error}
        </Alert>
      )}
      
      {city && weather ? (
        <Paper p="md" withBorder style={{ width: '100%' }}>
          <Stack align="center" gap="xs">
            <Title order={2}>{weather.city}</Title>
            <Text size="sm" c="dimmed">{formatDate(new Date())}</Text>
            <WeatherIcon iconClass={getWeatherIconClass(weather.weatherId)} />
            <Text size="lg" fw={500} tt="capitalize">
              {weather.description}
            </Text>
            <Text>{weather.temperature}°F</Text>
            <Group>
              <Group gap="xs">
                <IconDroplet size="1rem" />
                <Text>{weather.humidity}% humidity</Text>
              </Group>
              <Group gap="xs">
                <IconWind size="1rem" />
                <Text>{weather.windSpeed} mph wind</Text>
              </Group>
            </Group>
          </Stack>
        </Paper>
      ) : (
        <Center>
          <Text>Enter a city name to get weather information</Text>
        </Center>
      )}
      
      <form onSubmit={handleSearch} style={{ width: '100%' }}>
        <Stack gap="sm">
          <TextInput
            placeholder="Enter city name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
          />
          <Button type="submit" loading={loading}>Get Weather</Button>
        </Stack>
      </form>
      <Button onClick={handleClearCache} variant="outline" fullWidth>Clear Cache</Button>
    </Stack>
  );
};

export default Weather;
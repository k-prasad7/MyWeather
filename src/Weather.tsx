import React, { useState, useEffect } from 'react';
import { Stack, Title, TextInput, Button, Text, Paper, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  weatherId: number; // Add this line
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
  const [loading, setLoading] = useState<boolean>(true);
  const [city, setCity] = useState<string>('San Francisco'); // Set initial city to San Francisco
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  const apiKey = 'c90705a73d543fbf9d21ada91a8961b2';

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First API call to get coordinates
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
      
      // Second API call to get weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      );
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error! status: ${weatherResponse.status}`);
      }
      const weatherData = await weatherResponse.json();
      
      setWeather({
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        city: name,
        weatherId: weatherData.weather[0].id, // Add this line
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
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
      
      {weather && (
        <Paper p="md" withBorder style={{ width: '100%' }}>
          <Stack align="center" gap="xs">
            <Title order={2}>{weather.city}</Title>
            <Text size="sm" color="dimmed">{formatDate(new Date())}</Text>
            <WeatherIcon iconClass={getWeatherIconClass(weather.weatherId)} />
            <Text size="lg" fw={500} tt="capitalize">
              {weather.description}
            </Text>
            <Text>{weather.temperature}°F</Text>
          </Stack>
        </Paper>
      )}
      
      <Stack gap="sm" style={{ width: '100%' }}>
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <Button onClick={fetchWeather} loading={loading}>Get Weather</Button>
      </Stack>
    </Stack>
  );
};

export default Weather;
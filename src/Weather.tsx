import React, { useState, useEffect } from 'react';
import { Stack, Title, TextInput, Button, Text, Paper } from '@mantine/core';

interface WeatherData {
  temperature: number;
  description: string;
  city: string;
}

interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error! status: ${weatherResponse.status}`);
      }
      const weatherData = await weatherResponse.json();
      
      setWeather({
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        city: name,
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

  return (
    <Stack gap="md" align="center" style={{ width: '100%', maxWidth: 400 }}>
      <Title order={1}>MyWeather</Title>
      <Stack gap="sm" style={{ width: '100%' }}>
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <Button onClick={fetchWeather}>Get Weather</Button>
      </Stack>
      {weather && (
        <Paper p="md" withBorder style={{ width: '100%' }}>
          <Title order={2}>Weather for {weather.city}</Title>
          <Text>Temperature: {weather.temperature}°C</Text>
          <Text>Description: {weather.description}</Text>
        </Paper>
      )}
    </Stack>
  );
};

export default Weather;
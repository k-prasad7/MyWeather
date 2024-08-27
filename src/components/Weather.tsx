import React from 'react';
import { Stack, Title, Alert, Center, Text, Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useWeather } from '../hooks/useWeather';
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import { clearWeatherCache } from '../utils/weatherCache';

const Weather: React.FC = () => {
  const { data: weather, loading, error, handleSearch, resetWeather } = useWeather();

  const handleClearCache = () => {
    clearWeatherCache();
    resetWeather();
  };

  return (
    <Stack gap="md" align="center" style={{ width: '100%', maxWidth: 400 }}>
      <Title order={1}>MyWeather</Title>
      
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error.message}
        </Alert>
      )}
      
      {weather ? (
        <WeatherDisplay weather={weather} />
      ) : !loading && !error && (
        <Center>
          <Text>Enter a city name to get weather information</Text>
        </Center>
      )}
      
      <WeatherSearch onSearch={handleSearch} loading={loading} />
      
      <Button onClick={handleClearCache} variant="outline" fullWidth>Clear Cache</Button>
    </Stack>
  );
};

export default Weather;
import React from 'react';
import { Stack, Title, Alert, Center, Text, Button, Paper, Box } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import WeatherForecast from './WeatherForecast';
import { clearWeatherCache } from '../utils/weatherCache';
import { resetWeather, fetchWeatherAndForecast } from '../store/actions';
import { useAppDispatch, useAppSelector } from '../store/store';

const Weather: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: weather, loading, error } = useAppSelector((state) => state.weather.currentWeather);
  const forecastData = useAppSelector((state) => state.weather.forecast.data);

  const handleSearch = (city: string) => {
    dispatch(fetchWeatherAndForecast(city));
  };

  const handleClearCache = () => {
    clearWeatherCache();
    dispatch(resetWeather());
  };

  return (
    <Stack gap="md" align="stretch" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <Paper p="md" withBorder>
        <WeatherSearch onSearch={handleSearch} loading={loading} />
      </Paper>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error.message}
        </Alert>
      )}
      
      {weather ? (
        <>
          <WeatherDisplay weather={weather} />
          {forecastData && <WeatherForecast forecast={forecastData} />}
        </>
      ) : !loading && !error && (
        <Center>
          <Text>Enter a city name to get weather information</Text>
        </Center>
      )}
      
      <Button onClick={handleClearCache} variant="outline" fullWidth>Clear Cache</Button>
    </Stack>
  );
};

export default Weather;
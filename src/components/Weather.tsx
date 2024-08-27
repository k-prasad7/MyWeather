import React from 'react';
import { Stack, Title, Alert, Center, Text, Button } from '@mantine/core';
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
    <Stack gap="md" align="center" style={{ width: '100%', maxWidth: 400 }}>
      <Title order={1}>MyWeather</Title>
      
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
      
      <WeatherSearch onSearch={handleSearch} loading={loading} />
      
      <Button onClick={handleClearCache} variant="outline" fullWidth>Clear Cache</Button>
    </Stack>
  );
};

export default Weather;
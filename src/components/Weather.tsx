import React from 'react';
import { Stack, Alert, Center, Text, Paper } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import WeatherSearch from './WeatherSearch';
import WeatherForecast from './WeatherForecast';
import { resetWeather, fetchWeatherAndForecast } from '../store/actions';
import { useAppDispatch, useAppSelector } from '../store/store';

const Weather: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: weather, loading, error } = useAppSelector((state) => state.weather.currentWeather);
  const forecastData = useAppSelector((state) => state.weather.forecast.data);

  const handleSearch = (city: string) => {
    dispatch(fetchWeatherAndForecast(city));
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
      
      {weather && forecastData ? (
        <WeatherForecast currentWeather={weather} forecast={forecastData} />
      ) : !loading && !error && (
        <Center>
          <Text>Enter a city name to get weather information</Text>
        </Center>
      )}
    </Stack>
  );
};

export default Weather;
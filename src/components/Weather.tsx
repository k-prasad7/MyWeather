import React from 'react';
import {Alert, Center, Text, Box, Paper, Group } from '@mantine/core';
import { IconAlertCircle, IconArrowUp} from '@tabler/icons-react';
import WeatherForecast from './WeatherForecast';
import { useAppSelector } from '../store/store';

const Weather: React.FC = () => {
  const { data: weather, loading, error } = useAppSelector((state) => state.weather.currentWeather);
  const forecastData = useAppSelector((state) => state.weather.forecast.data);

  return (
    <Box maw={1200} mx="auto" w="100%" px="md" mt="xl" style={{ minHeight: 'calc(100vh - 100px)' }}>
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mb="md">
          {error.message}
        </Alert>
      )}
      
      {weather && forecastData ? (
        <WeatherForecast currentWeather={weather} forecast={forecastData} />
      ) : !loading && !error && (
        <Center style={{ height: '100%' }}>
          <Paper p="xl" shadow="md" radius="md">
            <Group gap="md" align="center">
              <IconArrowUp size={24} color="var(--mantine-color-sky-blue-6)" />
              <Text size="lg" fw={500} color="sky-blue.6">
                Enter a city name above to get weather information.
              </Text>
            </Group>
          </Paper>
        </Center>
      )}
    </Box>
  );
};

export default Weather;
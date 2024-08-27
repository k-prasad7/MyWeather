import React from 'react';
import { Stack, Title, Paper, Group, Text } from '@mantine/core';
import { WeatherForecast as WeatherForecastType } from '../types/weather';
import { getWeatherIconClass } from '../utils/weatherUtils';
import { formatDateShort, formatTime, is11AM } from '../utils/dateUtils';

interface WeatherForecastProps {
  forecast: WeatherForecastType[];
}

const WeatherForecastItem: React.FC<{ data: WeatherForecastType }> = ({ data }) => {
  const date = new Date(data.dt * 1000);
  return (
    <Paper p="xs" withBorder>
      <Stack gap="xs" align="center">
        <Text size="sm" fw={500}>{formatDateShort(date)}</Text>
        <Text size="xs">{formatTime(date)}</Text>
        <i className={`wi ${getWeatherIconClass(data.weather[0].id)}`} style={{ fontSize: '2rem' }} />
        <Text size="sm">{Math.round(data.main.temp)}°F</Text>
        <Text size="xs">{data.weather[0].description}</Text>
      </Stack>
    </Paper>
  );
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  // Filter forecast data to only include 11:00 AM entries
  const filteredForecast = forecast.filter(item => is11AM(new Date(item.dt * 1000)));

  // Group filtered forecast data by day
  const groupedForecast = filteredForecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {} as Record<string, WeatherForecastType>);

  return (
    <Stack gap="md">
      <Title order={3}>5-Day Forecast (11:00 AM)</Title>
      <Group gap="xs" style={{ overflowX: 'auto' }}>
        {Object.entries(groupedForecast).map(([date, item]) => (
          <WeatherForecastItem key={date} data={item} />
        ))}
      </Group>
    </Stack>
  );
};

export default WeatherForecast;

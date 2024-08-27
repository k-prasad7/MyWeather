import React from 'react';
import { Stack, Title, Paper, Group, Text } from '@mantine/core';
import { WeatherForecast as WeatherForecastType } from '../types/weather';
import { getWeatherIconClass } from '../utils/weatherUtils';
import { formatDateShort, formatTime } from '../utils/dateUtils';

interface WeatherForecastProps {
  forecast: WeatherForecastType[];
}

const WeatherForecastItem: React.FC<{ data: WeatherForecastType }> = ({ data }) => {
  const date = new Date(data.dt * 1000);
  return (
    <Paper p="xs" withBorder>
      <Stack gap="xs" align="center">
        <Text size="sm" weight={500}>{formatDateShort(date)}</Text>
        <Text size="xs">{formatTime(date)}</Text>
        <i className={`wi ${getWeatherIconClass(data.weather[0].id)}`} style={{ fontSize: '2rem' }} />
        <Text size="sm">{Math.round(data.main.temp)}°F</Text>
        <Text size="xs">{data.weather[0].description}</Text>
      </Stack>
    </Paper>
  );
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  // Group forecast data by day
  const groupedForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, WeatherForecastType[]>);

  return (
    <Stack spacing="md">
      <Title order={3}>5-Day Forecast</Title>
      {Object.entries(groupedForecast).map(([date, dayForecast]) => (
        <Stack key={date} spacing="xs">
          <Text weight={500}>{date}</Text>
          <Group spacing="xs" style={{ overflowX: 'auto' }}>
            {dayForecast.map((item) => (
              <WeatherForecastItem key={item.dt} data={item} />
            ))}
          </Group>
        </Stack>
      ))}
    </Stack>
  );
};

export default WeatherForecast;

import React from 'react';
import { Stack, Title, Paper, Group, Text } from '@mantine/core';
import { WeatherForecast as WeatherForecastType } from '../types/weather';
import { getWeatherIconClass } from '../utils/weatherUtils';
import { formatDateShort, formatTime, is11AM, isToday, addDays } from '../utils/dateUtils';

interface WeatherForecastProps {
  forecast: WeatherForecastType[];
}

const WeatherForecastItem: React.FC<{ data: WeatherForecastType; index: number }> = ({ data, index }) => {
  const date = new Date(data.dt * 1000);
  const dayLabel = index === 0 ? 'Today' : 
                   index === 1 ? 'Tomorrow' : 
                   formatDateShort(date);
  
  return (
    <Paper p="xs" withBorder style={{ flex: '1 1 0', minWidth: '0' }}>
      <Stack gap="xs" align="center">
        <Text size="sm" fw={500}>{dayLabel}</Text>
        <i className={`wi ${getWeatherIconClass(data.weather[0].id)}`} style={{ fontSize: '2rem' }} />
        <Text size="sm">{Math.round(data.main.temp_max)}°/{Math.round(data.main.temp_min)}°</Text>
        <Text size="xs">{data.weather[0].description}</Text>
        <Group gap="xs" justify="center">
          <Text size="xs">{Math.round(data.wind.speed)} mph</Text>
          <Text size="xs">{data.main.humidity}%</Text>
        </Group>
      </Stack>
    </Paper>
  );
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  const today = new Date();
  const fiveDayForecast = Array.from({ length: 5 }, (_, i) => {
    const targetDate = addDays(today, i);
    return forecast.find(item => {
      const itemDate = new Date(item.dt * 1000);
      return isToday(itemDate) && is11AM(itemDate);
    }) || forecast[i * 8]; // Fallback to every 8th item if 11 AM not found
  });

  return (
    <Stack gap="md">
      <Title order={3}>5-Day Forecast</Title>
      <Group grow align="stretch" style={{ gap: '10px' }}>
        {fiveDayForecast.map((item, index) => (
          <WeatherForecastItem key={`${item.dt}-${index}`} data={item} index={index} />
        ))}
      </Group>
    </Stack>
  );
};

export default WeatherForecast;

import React from 'react';
import { Stack, Title, Text, Paper, Group } from '@mantine/core';
import { IconDroplet, IconWind } from '@tabler/icons-react';
import { WeatherData } from '../types/weather';
import { getWeatherIconClass } from '../utils/weatherUtils'; // This line might need to be updated
import { formatDate } from '../utils/dateUtils';

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherIcon: React.FC<{ iconClass: string }> = ({ iconClass }) => (
  <i className={`wi ${iconClass}`} style={{ fontSize: '2rem' }} />
);

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <Paper p="md" withBorder style={{ width: '100%' }}>
      <Stack align="center" gap="xs">
        <Title order={2}>{weather.city}</Title>
        <Text size="sm" c="dimmed">{formatDate(new Date())}</Text>
        <WeatherIcon iconClass={getWeatherIconClass(weather.weatherId)} />
        <Text size="lg" fw={500} tt="capitalize">
          {weather.description}
        </Text>
        <Text>{weather.temperature.toFixed(1)}°F</Text>
        <Group>
          <Group gap="xs">
            <IconDroplet size="1rem" />
            <Text>{weather.humidity}% humidity</Text>
          </Group>
          <Group gap="xs">
            <IconWind size="1rem" />
            <Text>{weather.windSpeed.toFixed(1)} mph wind</Text>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
};

export default WeatherDisplay;

import React from 'react';
import { Stack, Title, Paper, Group, Text, Grid, Flex } from '@mantine/core';
import { IconDroplet, IconWind } from '@tabler/icons-react';
import { WeatherForecast as WeatherForecastType, WeatherData } from '../types/weather';
import { getWeatherIconClass } from '../utils/weatherUtils';
import { formatDate, formatDateShort, isSameDay, isMidday, groupForecastsByDay } from '../utils/dateUtils';

interface WeatherForecastProps {
  currentWeather: WeatherData;
  forecast: WeatherForecastType[];
}

const TodayForecastItem: React.FC<{ weather: WeatherData }> = ({ weather }) => {
  return (
    <Paper p="md" withBorder style={{ flex: '2 1 0', minWidth: '0' }}>
      <Stack gap="xs">
        <Title order={2}>{weather.city}</Title>
        <Text size="sm" c="dimmed">{formatDate(new Date())}</Text>
        <Grid>
          <Grid.Col span={6}>
            <Flex align="center" justify="center" style={{ height: '100%' }}>
              <Text style={{ fontSize: '5rem', fontWeight: 700 }}>{weather.temperature.toFixed(1)}</Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack align="center" justify="center" style={{ height: '100%' }}>
              <i className={`wi ${getWeatherIconClass(weather.weatherId)}`} style={{ fontSize: '5rem' }} />
              <Text size="lg" fw={500} tt="capitalize">{weather.description}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Group>
          <Group gap="xs">
            <IconDroplet size="1.2rem" />
            <Text>{weather.humidity}% humidity</Text>
          </Group>
          <Group gap="xs">
            <IconWind size="1.2rem" />
            <Text>{weather.windSpeed.toFixed(1)} mph wind</Text>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
};

const FutureForecastItem: React.FC<{ data: WeatherForecastType; index: number }> = ({ data, index }) => {
  const date = new Date(data.dt * 1000);
  const dayLabel = index === 0 ? 'Tomorrow' : formatDateShort(date);
  
  return (
    <Paper p="md" withBorder style={{ flex: '1 1 0', minWidth: '0' }}>
      <Stack gap="xs" align="center">
        <Text size="sm" fw={500}>{dayLabel}</Text>
        <Text style={{ fontSize: '3rem', fontWeight: 700 }}>{Math.round(data.main.temp)}°F</Text>
        <i className={`wi ${getWeatherIconClass(data.weather[0].id)}`} style={{ fontSize: '4rem' }} />
        <Text size="sm" tt="capitalize">{data.weather[0].description}</Text>
        <Group gap="lg" justify="center">
          <Group gap="xs" align="center">
            <IconWind size="1rem" />
            <Text size="xs">{Math.round(data.wind.speed)} mph</Text>
          </Group>
          <Group gap="xs" align="center">
            <IconDroplet size="1rem" />
            <Text size="xs">{data.main.humidity}%</Text>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ currentWeather, forecast }) => {
  const groupedForecasts = groupForecastsByDay(forecast);
  const middayForecasts = groupedForecasts.slice(1, 5).map(dayForecasts => {
    return dayForecasts.reduce((closest, current) => {
      if (!closest || Math.abs(isMidday(new Date(current.dt * 1000))) < Math.abs(isMidday(new Date(closest.dt * 1000)))) {
        return current;
      }
      return closest;
    });
  });

  return (
    <Stack gap="md">
      <Title order={3}>5-Day Forecast</Title>
      <Group align="stretch" style={{ gap: '10px' }}>
        <TodayForecastItem weather={currentWeather} />
        {middayForecasts.map((item, index) => (
          <FutureForecastItem key={`${item.dt}-${index}`} data={item} index={index} />
        ))}
      </Group>
    </Stack>
  );
};

export default WeatherForecast;

import { AppShell, useMantineColorScheme, ActionIcon, Group, Title, Flex, Paper } from '@mantine/core';
import { IconSun, IconMoonStars, IconRefresh } from '@tabler/icons-react';
import Weather from './components/Weather';
import WeatherSearch from './components/WeatherSearch';
import { clearWeatherCache } from './utils/weatherCache';
import { resetWeather, fetchWeatherAndForecast } from './store/actions';
import { useAppDispatch, useAppSelector } from './store/store';

function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.weather.currentWeather);

  const handleClearCache = () => {
    clearWeatherCache();
    dispatch(resetWeather());
  };

  const handleSearch = (city: string) => {
    dispatch(fetchWeatherAndForecast(city));
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Paper p="md" radius={0} shadow="sm" style={{ width: '100%', height: '100%' }}>
          <Flex justify="space-between" align="center" maw={1200} mx="auto" h="100%">
            <Title order={1}>MyWeather</Title>
            <Group>
              <WeatherSearch onSearch={handleSearch} loading={loading} />
              <ActionIcon
                variant="filled"
                color={dark ? 'yellow' : 'sky-blue'}
                onClick={handleClearCache}
                title="Clear cache"
                size="lg"
              >
                <IconRefresh size="1.2rem" />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                color={dark ? 'yellow' : 'sky-blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                size="lg"
              >
                {dark ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
              </ActionIcon>
            </Group>
          </Flex>
        </Paper>
      </AppShell.Header>

      <AppShell.Main>
        <Weather />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
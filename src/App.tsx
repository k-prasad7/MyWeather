import React from 'react';
import { AppShell, useMantineColorScheme, ActionIcon, Group, Title, Container } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import Weather from './components/Weather';

function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Container size="lg" style={{ height: '100%' }}>
          <Group justify="space-between" align="center" style={{ height: '100%' }}>
            <div style={{ width: '30px' }} /> {/* Spacer */}
            <Title order={1}>MyWeather</Title>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
            </ActionIcon>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Weather />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
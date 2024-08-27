import React from 'react';
import { AppShell, Center, useMantineColorScheme, ActionIcon, Box } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import Weather from './components/Weather';

function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <Box
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
        }}
      >
        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
      </Box>
      <Center style={{ height: 'calc(100vh - 60px)' }}>
        <Weather />
      </Center>
    </AppShell>
  );
}

export default App;
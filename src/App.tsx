import React from 'react';
import { MantineProvider, AppShell, Center, Stack } from '@mantine/core';
import Weather from './Weather';
import { theme } from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell padding="md">
        <Center style={{ height: '100vh' }}>
          <Stack align="center" gap="xl">
            <Weather />
          </Stack>
        </Center>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
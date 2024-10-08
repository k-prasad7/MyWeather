import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import App from './App.tsx';
import store from './store/store';
import { theme } from './theme';
import './assets/weather-icons/css/weather-icons.min.css';

// Import Mantine's CSS
import '@mantine/core/styles.css';

function ThemeWrapper() {
  const preferredColorScheme = useColorScheme();

  return (
    <MantineProvider 
      theme={theme}
      defaultColorScheme="auto"
    >
      <App />
    </MantineProvider>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  </React.StrictMode>
);
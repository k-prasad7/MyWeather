import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    'sky-blue': [
      '#E6F3FF', // lightest
      '#CCE6FF', // our base color
      '#B3D9FF',
      '#99CCFF',
      '#80BFFF',
      '#66B2FF',
      '#4DA6FF',
      '#3399FF',
      '#1A8CFF',
      '#0080FF',  // darkest
      '#0066CC'   // new darker shade for buttons
    ],
    'custom-gray': [
      '#F8F9FA',
      '#F1F3F5',
      '#E9ECEF',
      '#DEE2E6',
      '#CED4DA',
      '#ADB5BD',
      '#868E96',
      '#495057',
      '#343A40',
      '#212529'
    ]
  },
  primaryColor: 'sky-blue',
  primaryShade: 1,
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '32px', fontWeight: '700' },
      h2: { fontSize: '24px', fontWeight: '600' },
      h3: { fontSize: '20px', fontWeight: '600' },
      h4: { fontSize: '18px', fontWeight: '500' },
      h5: { fontSize: '16px', fontWeight: '500' },
      h6: { fontSize: '14px', fontWeight: '500' },
    },
  },
  shadows: {
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
  },
  breakpoints: {
    xs: '500px',
    sm: '800px',
    md: '1000px',
    lg: '1200px',
    xl: '1400px',
  },
  components: {
    Button: {
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-sky-blue-6)',
          color: 'var(--mantine-color-white)',
          '&:hover': {
            backgroundColor: 'var(--mantine-color-sky-blue-7)',
          },
        },
      },
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
        },
      },
    },
    Container: {
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-sky-blue-0)',
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: 'var(--mantine-color-sky-blue-0)',
        },
      },
    },
    Box: {
      styles: {
        root: {
          transition: 'background-color 0.3s ease',
        },
      },
    },
  },
};
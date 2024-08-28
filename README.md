# Weather Dashboard

A modern, responsive weather application built with React, TypeScript, and Vite. This app provides users with current weather conditions and forecasts for locations worldwide.

## Demo 
See here for a demo: https://youtu.be/NUh5wK0-WAo 
The CSS for the weather symbols broke in my last few commits as I was cleaning up so I checked out commit hash# 1f8e139b3416cbd927ebee6ef18dfe2636393482 for this demo.

## Features

- Display current weather conditions
- Show multi-day weather forecast
- Search functionality for different locations
- Responsive design for various devices
- Dynamic weather icons based on conditions
- Caching of weather data for improved performance
- State management using Redux

## Technologies Used

- React 18
- TypeScript
- Vite
- Redux for state management
- Mantine UI for component styling
- OpenWeather API for weather data
- Jest and React Testing Library for testing
- Weather Icons for visual representation

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-dashboard.git
   ```

2. Navigate to the project directory:
   ```
   cd weather-dashboard
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

### Running the App

To start the development server:

```
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

To create a production build:

```
npm run build
```

### Running Tests

To run the test suite:

```
npm run test
```

## Project Structure

```
weather-dashboard/
├── README.md
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── react.svg
│   │   └── weather-icons
│   │       └── css
│   │           ├── weather-icons-wind.css
│   │           ├── weather-icons-wind.min.css
│   │           ├── weather-icons.css
│   │           └── weather-icons.min.css
│   ├── components
│   │   ├── Weather.tsx
│   │   ├── WeatherForecast.tsx
│   │   ├── WeatherSearch.test.tsx
│   │   └── WeatherSearch.tsx
│   ├── config
│   │   └── constants.ts
│   ├── main.tsx
│   ├── store
│   │   ├── actions.ts
│   │   ├── reducers.ts
│   │   └── store.ts
│   ├── theme.ts
│   ├── types
│   │   └── weather.ts
│   ├── utils
│   │   ├── dateUtils.ts
│   │   ├── errorUtils.ts
│   │   ├── weatherCache.ts
│   │   └── weatherUtils.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

11 directories, 33 files
```

## Testing

This project uses Jest and React Testing Library for unit and integration testing. Test files are located next to the components they test and are named with a `.test.tsx` extension.

## Linting and Type Checking

The project uses ESLint for code linting and TypeScript for static type checking. Configuration files for both are included in the root directory.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Weather data provided by [OpenWeather API](https://openweathermap.org/api)
- UI components from [Mantine](https://mantine.dev/)
- Weather icons from [Weather Icons](https://erikflowers.github.io/weather-icons/)

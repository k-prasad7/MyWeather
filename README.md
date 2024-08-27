# Weather Dashboard

A modern, responsive weather application built with React, TypeScript, and Vite. This app provides users with current weather conditions and forecasts for locations worldwide.

## Features

- Display current weather conditions
- Show multi-day weather forecast
- Search functionality for different locations
- Responsive design for various devices
- Dynamic weather icons based on conditions
- Caching of weather data for improved performance

## Technologies Used

- React 18
- TypeScript
- Vite
- Mantine UI for component styling
- OpenWeather API for weather data
- Jest and React Testing Library for testing

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
├── src/
│   ├── components/
│   │   ├── WeatherSearch.tsx
│   │   └── WeatherSearch.test.tsx
│   ├── utils/
│   │   ├── weatherUtils.ts
│   │   ├── weatherCache.ts
│   │   ├── errorUtils.ts
│   │   └── dateUtils.ts
│   ├── types/
│   │   └── weather.ts
│   └── App.tsx
├── public/
├── .env
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Testing

This project uses Jest and React Testing Library for unit and integration testing. Test files are located next to the components they test and are named with a `.test.tsx` extension.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Weather data provided by [OpenWeather API](https://openweathermap.org/api)
- UI components from [Mantine](https://mantine.dev/)

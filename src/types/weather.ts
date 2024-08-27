// Represents the weather data for a specific location
export interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  weatherId: number;
  humidity: number;
  windSpeed: number;
}

// Represents the result from the geocoding API
export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Represents the units of temperature
export type TemperatureUnit = 'celsius' | 'fahrenheit';

// Represents the data structure for cached weather information
export interface CachedWeatherData {
  data: WeatherData;
  timestamp: number;
}

// Represents possible weather conditions (can be expanded as needed)
export type WeatherCondition = 
  'clear' | 
  'clouds' | 
  'rain' | 
  'thunderstorm' | 
  'snow' | 
  'mist' | 
  'fog';

// Represents a simplified weather forecast
export interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

// Type for the entire forecast response
export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// Error type
export interface WeatherError {
  message: string;
  code?: number | string;
}

// WeatherState including forecast
export interface WeatherState {
  currentWeather: {
    data: WeatherData | null;
    loading: boolean;
    error: WeatherError | null;
  };
  forecast: {
    data: WeatherForecast[] | null;
    loading: boolean;
    error: WeatherError | null;
  };
}

// Type for cached forecast data
export interface CachedForecastData {
  data: WeatherForecast[];
  timestamp: number;
}

// Type for processed forecast data
export interface ProcessedForecastData {
  date: Date;
  temperature: number;
  description: string;
  weatherId: number;
  // Add any other fields you want to include
}

// Root state type for the entire Redux store
export interface RootState {
  weather: WeatherState;
}

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
  date: Date;
  condition: WeatherCondition;
  highTemp: number;
  lowTemp: number;
}

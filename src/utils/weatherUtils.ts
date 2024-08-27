export function getWeatherIconClass(weatherId: number): string {
  if (weatherId >= 200 && weatherId < 300) return 'wi-thunderstorm';
  if (weatherId >= 300 && weatherId < 400) return 'wi-sprinkle';
  if (weatherId >= 500 && weatherId < 600) return 'wi-rain';
  if (weatherId >= 600 && weatherId < 700) return 'wi-snow';
  if (weatherId >= 700 && weatherId < 800) return 'wi-fog';
  if (weatherId === 800) return 'wi-day-sunny';
  if (weatherId > 800) return 'wi-cloudy';
  return 'wi-na';
}

// You might want to add more utility functions here in the future, such as:

export function convertToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function convertToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
}

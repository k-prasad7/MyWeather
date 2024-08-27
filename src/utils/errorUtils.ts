import { WeatherError } from '../types/weather';

export function processWeatherError(error: unknown): WeatherError {
  if (error instanceof Error) {
    // Handle network errors
    if (error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
      return {
        message: 'Unable to connect to the weather service. Please check your internet connection and try again.',
        code: 'NETWORK_ERROR'
      };
    }

    // Handle API errors
    if (error.message.includes('API error')) {
      const statusMatch = error.message.match(/status: (\d+)/);
      if (statusMatch) {
        const status = parseInt(statusMatch[1], 10);
        switch (status) {
          case 400:
            return {
              message: 'Invalid request. Please check your input and try again.',
              code: 400
            };
          case 401:
            return {
              message: 'Unauthorized access. Please check your API key.',
              code: 401
            };
          case 404:
            return {
              message: 'Weather information not found for the specified location.',
              code: 404
            };
          case 429:
            return {
              message: 'Too many requests. Please try again later.',
              code: 429
            };
          default:
            if (status >= 500) {
              return {
                message: 'Weather service is currently unavailable. Please try again later.',
                code: status
              };
            }
        }
      }
    }

    // Handle other known errors
    if (error.message.includes('City not found')) {
      return {
        message: 'City not found. Please check the spelling and try again.',
        code: 'CITY_NOT_FOUND'
      };
    }

    // Default error message for unhandled errors
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR'
    };
  }

  // Fallback for non-Error objects
  return {
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR'
  };
}

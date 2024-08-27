import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState, WeatherData, WeatherForecast, WeatherError } from '../types/weather';
import { resetWeather, fetchWeatherAndForecast } from './actions';

const initialState: WeatherState = {
  currentWeather: {
    data: null,
    loading: false,
    error: null
  },
  forecast: {
    data: null,
    loading: false,
    error: null
  }
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetWeather, (state) => {
      return initialState;
    })
    .addCase(fetchWeatherAndForecast.pending, (state) => {
      state.currentWeather.loading = true;
      state.currentWeather.error = null;
      state.forecast.loading = true;
      state.forecast.error = null;
    })
    .addCase(fetchWeatherAndForecast.fulfilled, (state, action: PayloadAction<{ currentWeather: WeatherData; forecast: WeatherForecast[] }>) => {
      state.currentWeather.data = action.payload.currentWeather;
      state.currentWeather.loading = false;
      state.currentWeather.error = null;
      state.forecast.data = action.payload.forecast;
      state.forecast.loading = false;
      state.forecast.error = null;
    })
    .addCase(fetchWeatherAndForecast.rejected, (state, action) => {
      const error = action.payload as WeatherError;
      state.currentWeather.loading = false;
      state.currentWeather.error = error;
      state.forecast.loading = false;
      state.forecast.error = error;
    });
});

export default weatherReducer;

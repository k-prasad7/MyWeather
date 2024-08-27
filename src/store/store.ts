import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import weatherReducer from './reducers';
import { RootState } from '../types/weather';

// Create the Redux store
const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Create a custom typed useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Create a custom typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

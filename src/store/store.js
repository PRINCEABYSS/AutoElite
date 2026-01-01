import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import carsReducer from './features/cars/carsSlice'; 
import garageReducer from './features/garage/garageSlice';
import themeReducer from './features/theme/themeSlice';
import languageReducer from './features/language/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    cars: carsReducer,
    garage: garageReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './sclices/userSlice';
import flightsReducer from './sclices/flightsSlice';
import hotelsReducer from './sclices/hotelsClice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    flights: flightsReducer,
    hotels: hotelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
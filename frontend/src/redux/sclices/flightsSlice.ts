import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FlightsState {
  flights: Flight[];
};

const initialState: FlightsState = {
  flights: [],
};

export const counterSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload
    },
    updateFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = [...state.flights, ...action.payload];
    },
    updateFlight: (state, action: PayloadAction<Flight>) => {
      state.flights = state.flights.map((flight) => {
        if (flight._id === action.payload._id) {
          return action.payload;
        }
        return flight;
      });
    },
  },
});

export const { setFlights, updateFlights, updateFlight } = counterSlice.actions;

export default counterSlice.reducer;
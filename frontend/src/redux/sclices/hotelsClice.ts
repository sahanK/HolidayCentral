import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface HotelsState {
  hotels: Hotel[];
};

const initialState: HotelsState = {
  hotels: [],
};

export const counterSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload
    },
    updateHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = [...state.hotels, ...action.payload];
    },
  },
});

export const { updateHotels, setHotels } = counterSlice.actions;

export default counterSlice.reducer;
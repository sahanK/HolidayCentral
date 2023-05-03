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
    updateHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = [...state.hotels, ...action.payload];
    },
  },
});

export const { updateHotels } = counterSlice.actions;

export default counterSlice.reducer;
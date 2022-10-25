import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickers: [],
}

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    change: (state, action) => {
      if(Array.isArray(action.payload)) {
        state.tickers = action.payload;
      }
    },
  },
});

export const { change } = tickersSlice.actions;

export default tickersSlice.reducer;

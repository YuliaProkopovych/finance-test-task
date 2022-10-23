import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickers: [],
}

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    change: (state, action) => {
      state.tickers = action.payload
    },
  },
})

export const { change } = tickersSlice.actions

export default tickersSlice.reducer

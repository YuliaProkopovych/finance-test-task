import { configureStore } from '@reduxjs/toolkit';
import tickersReducer from '../features/tickersSlice'

const store = configureStore({
  reducer: {
    tickers: tickersReducer,
  },
})

export default store;

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { tmdbApi } from './apiSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(tmdbApi.middleware)
});

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { tmdbApi } from './apiSlice';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		[tmdbApi.reducerPath]: tmdbApi.reducer,
	},
	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare().concat(tmdbApi.middleware),
});

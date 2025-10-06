import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  movies: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const movie = action.payload;
      const existingMovie = state.movies.find(
        (element) => element.id === movie.id
      );

      if (!existingMovie) {
        state.movies.push({ ...movie, price: 49 });
      } else {
        console.log('already exist');
      }
    },
    removeMovie: (state, action) => {
      const id = action.payload;
      state.movies = state.movies.filter(
        (movie) => movie.id !== id
      );
    },
  },
});

export const { addMovie, removeMovie } = cartSlice.actions;

export default cartSlice.reducer;

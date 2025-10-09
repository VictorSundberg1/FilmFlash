import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const movie = action.payload;
      const existingMovie = state.movies.find(
        (element) => element.id === movie.id
      );
      if (!existingMovie) {
        state.movies.push(movie);
      } else {
        console.log("already exist");
      }
    },
    removeMovie: (state, action) => {
      const id = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== id);
    },
    clearCart: (state) => {
      state.movies = [];
    },
  },
});

export const { addMovie, removeMovie, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

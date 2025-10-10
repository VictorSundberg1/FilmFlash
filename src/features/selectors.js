export const selectCartTotalPrice = (state) =>
  state.cart.movies.reduce((sum, movie) => sum + movie.price, 0);

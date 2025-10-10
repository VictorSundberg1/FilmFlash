import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { calculateMoviePrice } from "../utils/calculateMoviePrice";

const API_KEY = import.meta.env.VITE_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${API_KEY}`);
    },
  }),
  endpoints: (build) => ({
    getTrendingMovies: build.query({
      query: () => "trending/movie/day?language=en-US",
      //Lägger till priser i movie-objekten innan de går vidare i appen
      transformResponse: (response) => addPriceToMovies(response),
    }),

    getMovieDetails: build.query({
      query: (movieId) => `movie/${movieId}?language=en-US`,
      transformResponse: (response) => addPriceToSingleMovie(response),
    }),
    getSearchResult: build.query({
      query: ({ query, year }) => {
        //URLSearchParams bygger ett anrop enl standard
        const searchParams = new URLSearchParams({
          query,
          include_adult: "false",
          language: "en-US",
          page: 1,
        });
        //Finns möjlighet att ta in ett årtal och söka enbart på ett utgivningsår om vi vill i framtiden
        if (year) searchParams.append("year", year.toString());
        return `search/movie?${searchParams.toString()}`;
      },
      transformResponse: (response) => addPriceToMovies(response),
    }),
    getMoviesByGenre: build.query({
      query: ({ genreId, page = 1 }) =>
        `discover/movie?with_genres=${genreId}&language=en-US&page=${page}`,
      transformResponse: (response) => addPriceToMovies(response),
    }),
  }),
});

function addPriceToMovies(response) {
  if (response?.results) {
    const moviesWithPrice = response.results.map((movie) => ({
      ...movie,
      price: calculateMoviePrice(movie),
    }));
    return { ...response, results: moviesWithPrice };
  }
  return response;
}

function addPriceToSingleMovie(response) {
  if (response?.id) {
    const movieWithPrice = {
      ...response,
      price: calculateMoviePrice(response),
    };
    return movieWithPrice;
  }
  return response;
}

export const {
  useGetTrendingMoviesQuery,
  useLazyGetSearchResultQuery,
  useGetMoviesByGenreQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;

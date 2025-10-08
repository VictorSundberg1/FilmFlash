import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_API_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      headers.set('Authorization', `Bearer ${API_KEY}`);
    },
  }),
  endpoints: (build) => ({
    getTrendingMovies: build.query({
      query: () => 'trending/movie/day?language=en-US',
    }),
    getMovieDetails: build.query({
      query: (movieId) => `movie/${movieId}?language=en-US`,
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
        //Finns möjlighet att ta in ett årtal och söka enbart på ett utgivnings år om vi vill i framtiden
        if (year) searchParams.append("year", year.toString());
        return `search/movie?${searchParams.toString()}`;
      },
    }),
  }),
});

export const { useGetTrendingMoviesQuery, useLazyGetSearchResultQuery, useGetMovieDetailsQuery } =
  tmdbApi;
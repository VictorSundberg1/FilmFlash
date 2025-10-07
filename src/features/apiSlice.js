import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
    getSearchResult: build.query({
      query: ({ query, year }) => {
        const searchParams = new URLSearchParams({
          query,
          include_adult: "false",
          language: "en-US",
          page: 1,
        });
        if (year) searchParams.append("year", year.toString());
        // const yearString = year ? `&year=${year}` : "";
        // return `search/movie?query=${query}&include_adult=false&language=en-US&page=1${yearString}`;
        return `search/movie?${searchParams.toString()}`;
      },
    }),
  }),
});

export const { useGetTrendingMoviesQuery } = tmdbApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
	}),
});

export const { useGetTrendingMoviesQuery } = tmdbApi;

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import './MoviePage.css';
import MoviesFrame from '../components/MoviesFrame';
import { useGetMoviesByGenreQuery } from '../features/apiSlice';

function MoviePage() {
	const [movieState, setMovieState] = useState(null);
	const [activeGenre, setActiveGenre] = useState(28);

	const { data, isLoading } = useGetMoviesByGenreQuery(activeGenre);
	const genreMovies = data?.results || [];

	if (movieState?.error) return <h1>Something went wrong...</h1>;

	const moviesToShow = movieState?.data?.results || genreMovies;

	return (
		<div className="movie-page">
			<SearchBar onSearchResult={(state) => setMovieState(state)} />

			<div className="genreButtons">
				<button onClick={() => setActiveGenre(28)}>Action</button>
				<button onClick={() => setActiveGenre(35)}>Comedy</button>
				<button onClick={() => setActiveGenre(18)}>Drama</button>
				<button onClick={() => setActiveGenre(27)}>Horror</button>
			</div>

			<div className="mainContainer">
				{isLoading ? (
					<p>Loading Movies...</p>
				) : (
					<MoviesFrame movies={moviesToShow} title={'Movies'} />
				)}
			</div>
		</div>
	);
}

export default MoviePage;

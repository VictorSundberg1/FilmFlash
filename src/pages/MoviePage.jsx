import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import './MoviePage.css';
import MoviesFrame from '../components/MoviesFrame';

function MoviePage() {
	const [movieState, setMovieState] = useState(null);
	if (movieState?.error) return <h1>Something went wrong...</h1>;

	const movies = movieState?.data?.results || [];

	return (
		<div className="movie-page">
			<SearchBar onSearchResult={(state) => setMovieState(state)} />

			<div className="mainContainer">
				<MoviesFrame movies={movies} title={'movies'} />
			</div>
		</div>
	);
}

export default MoviePage;

import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import './MoviePage.css';
import MoviesFrame from '../components/MoviesFrame';
import { useGetMoviesByGenreQuery } from '../features/apiSlice';

function MoviePage() {
	const [movieState, setMovieState] = useState(null);
	const [activeGenre, setActiveGenre] = useState(28);
	const [page, setPage] = useState(1);

	const { data, isLoading } = useGetMoviesByGenreQuery({
		genreId: activeGenre,
		page,
	});
	const genreMovies = data?.results || [];

	// if (movieState?.error) return <h1>Something went wrong...</h1>;

	useEffect(() => {
		setPage(1);
	}, [activeGenre, movieState]);

	function incrementPage() {
		setPage((page) => page + 1);
	}

	function decrementPage() {
		setPage((page) => Math.max(1, page - 1));
	}

	const moviesToShow = movieState
		? movieState?.data?.results || []
		: genreMovies;

	return (
		<div className='movie-page'>
			<SearchBar onSearchResult={(state) => setMovieState(state)} />

			<div className='genreButtons'>
				<button onClick={() => setActiveGenre(28)}>Action</button>
				<button onClick={() => setActiveGenre(35)}>Comedy</button>
				<button onClick={() => setActiveGenre(18)}>Drama</button>
				<button onClick={() => setActiveGenre(27)}>Horror</button>
				<button onClick={() => setActiveGenre(10751)}>Family</button>
			</div>

			<div className='mainMovieContainer'>
				{isLoading ? (
					<p>Loading Movies...</p>
				) : (
					<MoviesFrame
						movies={moviesToShow}
						title={'Movies'}
						page={page}
						onNextPage={incrementPage}
						onPrevPage={decrementPage}
					/>
				)}
			</div>
		</div>
	);
}

export default MoviePage;

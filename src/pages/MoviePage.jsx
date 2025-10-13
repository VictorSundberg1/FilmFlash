import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import './MoviePage.css';
import MoviesFrame from '../components/MoviesFrame';
import { useGetMoviesByGenreQuery } from '../features/apiSlice';

function MoviePage() {
	const [movieState, setMovieState] = useState(null);
	const [activeGenre, setActiveGenre] = useState(28);
	const [page, setPage] = useState(1);

	const categories = [
		{ id: 28, name: 'Action' },
		{ id: 35, name: 'Comedy' },
		{ id: 18, name: 'Drama' },
		{ id: 27, name: 'Horror' },
		{ id: 10751, name: 'Family' },
	];

	const { data, isLoading } = useGetMoviesByGenreQuery({
		genreId: activeGenre,
		page,
	});
	const genreMovies = data?.results || [];

	useEffect(() => {
		setPage(1);
	}, [activeGenre, movieState]);

	function incrementPage() {
		setPage((page) => page + 1);
	}

	function decrementPage() {
		setPage((page) => Math.max(1, page - 1));
	}

	const activeCategory = categories.find(
		(category) => category.id === activeGenre
	);

	const frameTitle = movieState
		? 'Search Result'
		: activeCategory?.name || 'Movies';

	const moviesToShow = movieState
		? movieState?.data?.results || []
		: genreMovies;

	return (
		<div className="movie-page">
			<SearchBar onSearchResult={(state) => setMovieState(state)} />

			<div className="genreButtons">
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => {
							setActiveGenre(category.id);
							setMovieState(null);
						}}
						className={category.id === activeGenre ? 'activeGenre' : ''}
					>
						{category.name}
					</button>
				))}
			</div>

			<div className="mainContainer">
				{isLoading ? (
					<p>Loading Movies...</p>
				) : (
					<MoviesFrame
						movies={moviesToShow}
						title={frameTitle}
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

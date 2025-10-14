import MovieCard from './MovieCard';
import './MoviesFrame.css';

function MoviesFrame({
	movies,
	title,
	limit,
	onNextPage,
	onPrevPage,
	page,
	totalPages,
	totalResults,
}) {
	const limitedMovies = limit ? movies.slice(0, limit) : movies;
	const totalResultsDisplay = totalResults ? (
		<p>Total: {totalResults}</p>
	) : null;

	return (
		<main className='flexContainer'>
			<section className='containerTitle'>
				<h1>{title}</h1>
				{totalResultsDisplay}
			</section>

			<section className='movieCardContainer'>
				{limitedMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
			{page ? (
				<section className='pageSection'>
					<button onClick={onPrevPage} disabled={page <= 1}>
						-
					</button>
					<p className='pageIndicator'>
						Page {page}/{totalPages}
					</p>
					<button onClick={onNextPage} disabled={page >= totalPages}>
						+
					</button>
				</section>
			) : null}
		</main>
	);
}

export default MoviesFrame;

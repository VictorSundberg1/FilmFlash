import MovieCard from './MovieCard';
import './MoviesFrame.css';

function MoviesFrame({ movies, title, limit, onNextPage, onPrevPage, page }) {
	const limitedMovies = limit ? movies.slice(0, limit) : movies;

	return (
		<main className="flexContainer">
			<section className="containerTitle">
				<h1>{title}</h1>
			</section>
			<section className="movieCardContainer">
				{limitedMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
			{page ? (
				<section className="pageSection">
					<button onClick={onPrevPage} disabled={page <= 1}>
						-
					</button>
					<p className="pageIndicator">Page {page}</p>
					<button onClick={onNextPage}>+</button>
				</section>
			) : null}
		</main>
	);
}

export default MoviesFrame;

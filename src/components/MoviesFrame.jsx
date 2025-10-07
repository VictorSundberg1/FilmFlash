import MovieCard from './MovieCard';
import './MoviesFrame.css';

function MoviesFrame({ movies, title, limit }) {
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
		</main>
	);
}

export default MoviesFrame;

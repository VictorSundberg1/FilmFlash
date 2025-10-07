import MovieCard from './MovieCard';
import './MoviesFrame.css';

function MoviesFrame({ movies }) {
	return (
		<main className="flexContainer">
			<section className="containerTitle">
				<h1>Trending</h1>
			</section>
			<section className="movieCardContainer">
				{movies.slice(0, 6).map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
		</main>
	);
}

export default MoviesFrame;

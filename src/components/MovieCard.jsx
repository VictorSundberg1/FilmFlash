import { Link } from 'react-router';
import './MovieCard.css';
import defaultImage from '../assets/defaultImage.svg';

function MovieCard({ movie }) {
	const { title, overview, poster_path, id, price } = movie;

	const imageUrl = poster_path
		? `https://image.tmdb.org/t/p/w500${poster_path}`
		: defaultImage;

	return (
		<Link to={`/movies/${id}`} className='movieCardLink' state={{ price }}>
			<main className='movieCard'>
				<img
					src={imageUrl}
					alt={title}
					className='movieCardPoster'
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = defaultImage;
					}}
				/>
				<section className='textSection'>
					<h1 className='movieCardTitle'>{title}</h1>
					<p className='movieCardOverview'>{overview}</p>
					<p className='movieCardPriceTag'>{price.toFixed(2)} kr</p>
				</section>
			</main>
		</Link>
	);
}

export default MovieCard;

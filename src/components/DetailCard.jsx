import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addMovie } from '../features/cartSlice';
import { useGetMovieCreditsQuery } from '../features/apiSlice';

export default function DetailCard({ movie }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//Lägger till i varukorgen
	const handleAddToCart = () => {
		dispatch(addMovie(movie));
	};

	//Hämtar director från credits i queryn när movie id finns för att undvika onödiga anrop
	const { data: credits } = useGetMovieCreditsQuery(movie.id, {
		skip: !movie.id,
	});

	return (
		<div className='div-container'>
			<h3 className='film-title'>{movie.title}</h3>
			<section className='title-img'>
				<img
					className='film-img'
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt='moviecover'
				/>
				<button className='back-btn' onClick={() => navigate(-1)}>
					🔙
				</button>
				<img
					className='bd-film-img'
					src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
					alt='moviebackground'
				/>
			</section>

			<section className='about-film'>
				<h3>About</h3>
				<span className='film-details'>
					{movie.runtime} min ‣{' '}
					{movie.genres?.map((genre) => genre.name).join(', ')} ‣{' '}
					{movie.release_date} <br />
					Rate: {movie.vote_average}/10
				</span>
				<p className='film-desc'>{movie.overview}</p>

				<span>
					{credits?.director && (
						<a
							href={`https://www.themoviedb.org/person/${credits.director.id}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							{' '}
							Director: {credits.director.name}
						</a>
					)}
				</span>
			</section>

			<section className='addCart-container'>
				<h2 className='cart-title'>{movie.title}</h2>
				<h1 className='price-tag'>{movie.price.toFixed(2)}:-</h1>
				<ul>
					<li>Streaminglink right away</li>
					<li>Exclusive offers!</li>
				</ul>
				<button className='addCart-btn' onClick={handleAddToCart}>
					Add to Cart
				</button>
			</section>
		</div>
	);
}

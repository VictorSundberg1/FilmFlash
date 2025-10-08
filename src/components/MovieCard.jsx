import { Link } from "react-router";
import "./MovieCard.css";
import { calculateMoviePrice } from "../utils/calculateMoviePrice";

function MovieCard({ movie }) {
  const { title, overview, poster_path, id } = movie;

  const price = calculateMoviePrice(movie);

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link to={`/details/${id}`} className='movieCardLink'>
      <main className='movieCard'>
        <img src={imageUrl} alt={title} className='movieCardPoster' />
        <section className='textSection'>
          <h1 className='movieCardTitle'>{title}</h1>
          <p className='movieCardOverview'>{overview}</p>
          <p className='movieCardPriceTag'>{`${price} kr`}</p>
        </section>
      </main>
    </Link>
  );
}

export default MovieCard;

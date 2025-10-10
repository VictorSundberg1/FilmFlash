import { Link } from "react-router";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const { title, overview, poster_path, id, price } = movie;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link to={`/details/${id}`} className='movieCardLink' state={{ price }}>
      <main className='movieCard'>
        <img src={imageUrl} alt={title} className='movieCardPoster' />
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

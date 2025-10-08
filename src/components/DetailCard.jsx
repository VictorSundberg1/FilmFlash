import { useNavigate } from "react-router";
import { calculateMoviePrice } from "../utils/priceHandler";

export default function DetailCard({ movie }) {
  const navigate = useNavigate();
  const price = calculateMoviePrice(movie).formatted;

  return (
    <div className='div-container'>
      <section className='title-img'>
        <h3 className='film-title'>{movie.title}</h3>
        <img
          className='film-img'
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt='moviecover'
        />
        <img
          className='bd-film-img'
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt='moviebackground'
        />
      </section>

      <button className='back-btn' onClick={() => navigate("/")}>
        🔙
      </button>

      <section className='about-film'>
        <h3>About</h3>
        <span className='film-details'>
          {movie.release_date} ‣{" "}
          {movie.genres?.map((genre) => genre.name).join(", ")} ‣{" "}
          {movie.vote_average}/10
        </span>
        <p className='film-desc'>{movie.overview}</p>

        {/*exempel, lägg till sen*/}
        <span>
          <a href='#'>Director</a>
          <a href='#'>Screenplay</a>
        </span>
      </section>

      <section className='addCart-container'>
        <h2 className='cart-title'>{movie.title}</h2>
        <h1 className='price-tag'>{price}</h1>
        <ul>
          <li>Streaminglink right away</li>
          <li>Exclusive offers!</li>
        </ul>
        <button className='addCart-btn' onClick={() => navigate("/checkout")}>
          Add to Cart
        </button>
      </section>
    </div>
  );
}

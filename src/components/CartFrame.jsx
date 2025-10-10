import { removeMovie, clearCart } from '../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import './CartFrame.css';
import DeleteIcon from '@mui/icons-material/Delete';
import CartOverview from './CartOverview';

export default function CartFrame() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.cart);
  const price = 49;

  const handleRemove = (id) => {
    dispatch(removeMovie(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='cartframe-wrapper'>
    <div className="cartframe-box">
      <div className="cartframe-container">
        {movies.length === 0 ? (
          <p key="empty">Your cart is empty, go explore!</p>
        ) : (
            <>
          <span className='cartframe-header'>
            <h3>Cart ({movies.length} movies)</h3>
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Remove All
            </button>
            </span>
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <img
                    className="cartframe-img"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="moviecover"
                  />
                  <section className="in-cart">
                    <div className='movie-info'>
                    <p className="cartframe-title">{movie.title}</p>
                    <p className="cartframe-desc">{movie.overview}</p>
                    </div>
                    <div className='bottom-actions'>
                    <span className='cartframe-price'>{price}:-</span>
                    <button
                      className="cartframe-removeBtn"
                      onClick={() => handleRemove(movie.id)}
                    >
                      <DeleteIcon />
                    </button>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
            </>
        )}
      </div>
    </div>
    <CartOverview />
    </div>
  );
}

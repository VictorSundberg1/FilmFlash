import { useDispatch, useSelector } from 'react-redux';
import { removeMovie } from '../features/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import './CartDropdown.css';

export default function CartDropdown() {
  const dispatch = useDispatch();
  const { movies, totalPrice } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeMovie(id));
  };

  return (
    <div className="cart-dropdown">
      {movies.length === 0 ? (
        <p key="empty" className="empty-cart">
          Your cart is empty... Look for something you'd like first!
        </p>
      ) : (
        <>
          <h3>Cart ({movies.length})</h3>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <span className="movie-title">{movie.title}</span>
                <div className="right-section">
                  <span className="price">{movie.price}:-</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(movie.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="total">
            <strong>Total: {totalPrice} sek</strong>
          </p>
        </>
      )}
    </div>
  );
}

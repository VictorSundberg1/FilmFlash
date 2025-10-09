import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../features/cartSlice";
import "./CartDropdown.css";
import { selectCartTotalPrice } from "../features/selectors";

export default function CartDropdown() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.cart);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleRemove = (id) => {
    dispatch(removeMovie(id));
  };

  return (
    <div className='cart-dropdown'>
      {movies.length === 0 ? (
        <p key='empty' className='empty-cart'>
          Your cart is empty... Look for something you'd like first!
        </p>
      ) : (
        <>
          <h3>Cart ({movies.length})</h3>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <span className='movie-title'>{movie.title}</span>
                <div className='right-section'>
                  <span className='price'>{movie.price.toFixed(2)}:-</span>
                  <button
                    className='remove-btn'
                    onClick={() => handleRemove(movie.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className='total'>
            <strong>Total: {totalPrice.toFixed(2)} sek</strong>
          </p>
        </>
      )}
    </div>
  );
}

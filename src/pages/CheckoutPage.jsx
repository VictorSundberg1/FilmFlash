import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./CheckoutPage.css";

function CheckoutPage() {
  const movies = useSelector((s) => s.cart.movies || []);
  const navigate = useNavigate();

  const subtotal = movies.reduce((s, m) => s + (m.price ?? 49), 0);

  return (
    <div className='checkout-page'>
      <h1>Checkout</h1>
      <p>Articlaes: {movies.length}</p>
      <p>Total: {subtotal.toFixed(2)} kr</p>

      <button
        onClick={() => {
          navigate("/receipt");
        }}
      >
        Buy
      </button>
    </div>
  );
}

export default CheckoutPage;

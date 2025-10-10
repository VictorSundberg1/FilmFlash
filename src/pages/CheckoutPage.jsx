import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './CheckoutPage.css';
import CartOverview from '../components/CartOverview';
import CartFrame from '../components/CartFrame';

function CheckoutPage() {
  const movies = useSelector((s) => s.cart.movies || []);
  const navigate = useNavigate();

  const subtotal = movies.reduce((s, m) => s + (m.price ?? 49), 0);

  return (
    <div className="checkout-container">
      <CartFrame />
    </div>
  );
}

export default CheckoutPage;

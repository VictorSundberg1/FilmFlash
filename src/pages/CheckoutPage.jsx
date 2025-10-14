import { useSelector } from 'react-redux';
import './CheckoutPage.css';
import CartFrame from '../components/CartFrame';

function CheckoutPage() {
	const movies = useSelector((s) => s.cart.movies || []);

	const subtotal = movies.reduce((s, m) => s + (m.price ?? 49), 0);

	return (
		<div className='checkout-container'>
			<CartFrame />
		</div>
	);
}

export default CheckoutPage;

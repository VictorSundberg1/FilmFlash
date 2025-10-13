import './CartOverview.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectCartTotalPrice } from '../features/selectors';

export default function CartOverview() {
	const {} = useSelector((state) => state.cart);
	const navigate = useNavigate();
	const totalPrice = useSelector(selectCartTotalPrice);

	return (
		<div className='checkout-box'>
			<div className='orderview-box'>
				<div className='orderview-container'>
					<section className='orderview-text'>
						<p>Orderview</p>
					</section>

					<section className='orderview-content'>
						<div className='order-row'>
							<p>Payment</p>
							<span>Card</span>
						</div>
						<div className='order-row'>
							<p>Discount</p>
							<span>0:-</span>
						</div>

						<div className='order-row'>
							<p>Tax (12%)</p>
							<span>{(0.12 * totalPrice).toFixed(2)}:-</span>
						</div>
					</section>

					<section className='orderview-text'>
						<p>TOTAL</p>
						<span>{totalPrice.toFixed(2)}:-</span>
					</section>
				</div>
			</div>

			<div className='cart-buttons'>
				<button
					id='explore-btn'
					onClick={() => {
						navigate('/movies');
					}}
				>
					Go Explore More!
				</button>
				<button
					id='buy-btn'
					onClick={() => {
						navigate('/receipt');
					}}
				>
					BUY
				</button>
			</div>
		</div>
	);
}

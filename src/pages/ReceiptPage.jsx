import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { clearCart } from '../features/cartSlice';
import './ReceiptPage.css';

function formatDateISO(date = new Date()) {
	const d = new Date(date);
	const pad = (n) => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
		d.getHours()
	)}:${pad(d.getMinutes())}`;
}

function generateOrderId() {
	const now = Date.now().toString(36).toUpperCase();
	const random = Math.floor(Math.random() * 9000 + 1000);
	return `FF-${now}-${random}`;
}

export default function ReceiptPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const movies = location.state.movies;

	// calculate totals
	const totals = useMemo(() => {
		const subtotal = movies.reduce((sum, m) => sum + (m.price ?? 49), 0);
		const tax = +(subtotal * 0.12).toFixed(2);
		const total = +(subtotal + tax).toFixed(2);
		return { subtotal, tax, total };
	}, [movies]);

	// ordermeta
	const orderId = useMemo(() => generateOrderId(), []);
	const orderDate = useMemo(() => new Date(), []);

	// Empty cart
	useEffect(() => {
		dispatch(clearCart());
	}, []);

	return (
		<div className='receipt-page'>
			<div className='receipt-card'>
				<header className='receipt-header'>
					<h1>Thank you for your order!</h1>
					<h3 className='small'>Order confirmation</h3>
				</header>

				<section className='order-meta'>
					<div className='meta-row'>
						<strong>Order id:</strong> {orderId}
					</div>
					<div>
						<strong>Date:</strong> {formatDateISO(orderDate)}
					</div>
					<div>
						<strong>Payment method:</strong> Card •••• •••• •••• 4242
					</div>
				</section>

				<section className='items-section'>
					<h2>Purchased products</h2>
					{movies.length === 0 ? (
						<p className='muted'>
							No items in cart (cart was cleared after checkout).
						</p>
					) : (
						<ul className='items-list'>
							{movies.map((m) => (
								<li key={m.id} className='item-row'>
									<div className='item-title'>{m.title}</div>
									<div className='item-qty-price'>
										<span>1 ×</span>
										<span className='price'>
											{(m.price ?? 49).toFixed(2)} kr
										</span>
									</div>
								</li>
							))}
						</ul>
					)}
				</section>

				<section className='summary-section'>
					<div className='summary-row'>
						<span>Amount</span>
						<span>{totals.subtotal.toFixed(2)} kr</span>
					</div>
					<div className='summary-row'>
						<span>Tax (12%)</span>
						<span>{totals.tax.toFixed(2)} kr</span>
					</div>
					<div className='summary-row total'>
						<strong>Total</strong>
						<strong>{totals.subtotal.toFixed(2)} kr</strong>
					</div>
				</section>

				<section className='actions'>
					<button
						className='btn'
						onClick={() => {
							window.print();
						}}
					>
						Print receipt
					</button>

					<button
						className='btn outline'
						onClick={() => {
							navigate('/');
						}}
					>
						To Home
					</button>
				</section>

				<footer className='receipt-footer'>
					<p>Do you have any questions? Contact support@filmflash.com</p>
				</footer>
			</div>
		</div>
	);
}

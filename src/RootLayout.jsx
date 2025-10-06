import { Outlet } from 'react-router';
import './RootLayout.css';

function RootLayout() {
	return (
		<>
			<header>
				<h1>Header</h1>
			</header>

			<main>
				<Outlet />
			</main>

			<footer>
				<h1>footer</h1>
			</footer>
		</>
	);
}

export default RootLayout;

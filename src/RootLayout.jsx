import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import './RootLayout.css';

function RootLayout() {
	return (
		<>
			<Header/>

			<main>
				<Outlet />
			</main>

			<Footer/>
		</>
	);
}

export default RootLayout;

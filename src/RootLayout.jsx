import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import './RootLayout.css';

function RootLayout() {
	return (
		<>
			<Header/>
		<div className='wrapper'>
			<main className='mainContent'>
				<Outlet />
			</main>

			<Footer/>
			</div>
		</>
	);
}

export default RootLayout;

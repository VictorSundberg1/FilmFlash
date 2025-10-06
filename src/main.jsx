import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootLayout from './RootLayout.jsx';
import { Provider } from 'react-redux';
import { store } from './features/store.js';
import { createHashRouter, RouterProvider } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import MoviePage from './pages/MoviePage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

const router = createHashRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/movies',
				element: <MoviePage />,
			},
			{
				path: '/details/:id',
				element: <DetailPage />,
			},
			{
				path: '/checkout',
				element: <CheckoutPage />,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);

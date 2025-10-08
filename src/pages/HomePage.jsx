import { Link, useNavigate } from 'react-router';
import MoviesFrame from '../components/MoviesFrame';
import { useGetTrendingMoviesQuery } from '../features/apiSlice';
import './HomePage.css';

function HomePage() {
  const { data, error, isLoading } = useGetTrendingMoviesQuery();
  const movies = data?.results || [];

	if (isLoading) return <h1>Loading..</h1>;
	if (error) return <h1>Error</h1>;
	return (
		<div className="mainContainer">
			<MoviesFrame movies={movies} title={'Trending'} limit={6} />
		</div>
	);
}

export default HomePage;
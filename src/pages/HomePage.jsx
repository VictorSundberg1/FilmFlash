import SearchBar from "../components/SearchBar";
import { useGetTrendingMoviesQuery } from "../features/apiSlice";
import "./HomePage.css";

function HomePage() {
  const { data, error, isLoading } = useGetTrendingMoviesQuery();

  const movies = data?.results || [];

  if (isLoading) return <h1>Loading..</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <>
      <SearchBar />
      {/* {movies.map((movie) => (
				<div key={movie.id}>
					<h1>{movie.title}</h1>
				</div>
			))}
			<div>
				<h1>Content</h1>
			</div> */}
    </>
  );
}

export default HomePage;

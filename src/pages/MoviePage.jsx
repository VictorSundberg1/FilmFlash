import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "./MoviePage.css";

function MoviePage() {
  const [movieState, setMovieState] = useState(null);
  if (movieState?.error) return <h1>Something went wrong...</h1>;

  return (
    <div className='movie-page'>
      <SearchBar onSearchResult={(state) => setMovieState(state)} />
      {movieState?.data?.results.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}

export default MoviePage;

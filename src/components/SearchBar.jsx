import { useEffect, useState } from "react";
import "./SearchBar.css";
import { useLazyGetSearchResultQuery } from "../features/apiSlice";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";

/**
 * SearchBar component allows a user to search the MovieDB API for movies.
 * Displays a loading indicator on the search button while fetching results.
 *
 * @param {Object} props
 * @param {(result: { data?: any, error?: object }) => void} props.onSearchResult
 * Callback called when a search completes, containing the state of the search (data or error).
 */
function SearchBar({ onSearchResult }) {
  const [query, setQuery] = useState("");
  const [triggerSearch, { data, error, isLoading }] =
    useLazyGetSearchResultQuery();

  useEffect(() => {
    if (data || error) {
      onSearchResult({ data, error });
    }
  }, [data, error, isLoading]);

  return (
    <div className='search-bar'>
      <input
        placeholder='Search movies...'
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && query.trim() !== "" && !isLoading) {
            triggerSearch({ query });
          }
        }}
      />
      <IconButton
        className='icon-button'
        onClick={() => triggerSearch({ query })}
        disabled={query.trim() === ""}
        loadingIndicator={<CircularProgress />}
        loading={isLoading}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBar;

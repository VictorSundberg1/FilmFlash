import { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <div className='search-bar'>
      <input
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>
        <Search></Search>
      </button>
    </div>
  );
}

export default SearchBar;

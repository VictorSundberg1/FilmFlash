import { useEffect, useState } from 'react';
import './SearchBar.css';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

/**
 * SearchBar component for searching movies.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {(query: string|null) => void} props.onSearch - Callback function invoked when a search is performed or the search field is cleared (null).
 * @param {boolean} props.isLoading - Indicates if a search request is in progress; disables input and shows a loading indicator.
 *
 * @example
 * <SearchBar onSearch={(query) => handleSearch(query)} isLoading={loading} />
 */
function SearchBar({ onSearch, isLoading }) {
	const [query, setQuery] = useState('');

	// Returnerar null ifall sökfältet töms för att kunna visa kategorier igen
	useEffect(() => {
		if (query === '') {
			onSearch(null);
		}
	}, [query]);

	const handleSearch = () => {
		const q = query.trim();
		if (!q && isLoading) return;
		console.log('Query: ', q);
		onSearch(q);
	};

	return (
		<div className='search-bar'>
			<input
				placeholder='Search movies...'
				type='search'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						handleSearch();
					}
				}}
			/>
			<IconButton
				className='icon-button'
				onClick={() => handleSearch()}
				disabled={query.trim() === ''}
				loadingIndicator={<CircularProgress />}
				loading={isLoading}
			>
				<SearchIcon />
			</IconButton>
		</div>
	);
}

export default SearchBar;

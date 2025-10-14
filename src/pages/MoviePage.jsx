import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import './MoviePage.css';
import MoviesFrame from '../components/MoviesFrame';
import {
	useGetMoviesByGenreQuery,
	useLazyGetSearchResultQuery,
} from '../features/apiSlice';
import { useSearchParams } from 'react-router';

function MoviePage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(
		() => searchParams.get('q') || null
	);
	const [activeGenre, setActiveGenre] = useState(
		() => parseInt(searchParams.get('genre')) || 28
	);
	const [page, setPage] = useState(
		() => parseInt(searchParams.get('page')) || 1
	);
	const isSearching = searchQuery && searchQuery.trim() !== '';

	const categories = [
		{ id: 28, name: 'Action' },
		{ id: 35, name: 'Comedy' },
		{ id: 18, name: 'Drama' },
		{ id: 27, name: 'Horror' },
		{ id: 10751, name: 'Family' },
	];

	const [
		triggerSearch,
		{ data: searchData, error: searchError, isLoading: searchIsLoading },
	] = useLazyGetSearchResultQuery();

	//söker på aktiv vald genre men skippar genre vid egen sökning
	const { data, isLoading: genreIsLoading } = useGetMoviesByGenreQuery(
		{
			genreId: activeGenre,
			page,
		},
		{ skip: !!searchQuery }
	);

	const genreMovies = data?.results || [];

	//url uppdateras baserat på state, tar bort genre vid egen sökning och hanterar rensning/växling av kategori utan att overridea över varandra
	useEffect(() => {
		if (searchQuery) {
			setSearchParams((params) => {
				params.set('q', searchQuery);
				params.set('page', page.toString());
				params.delete('genre');
				return params;
			});
			return;
		}

	//annars sätter genre och sida, reset till sida 1 om ny genre blir vald
		const newPage =
			activeGenre !== (parseInt(searchParams.get('genre')) || 28) ? 1 : page;
		if (newPage !== page) {
			setPage(newPage);
		}
		setSearchParams((params) => {
			params.set('genre', activeGenre.toString());
			params.set('page', newPage.toString());
			params.delete('q');
			return params;
		});
	}, [page, activeGenre, searchQuery, setSearchParams, searchParams]);

	//Sök start eller sida ändring
	useEffect(() => {
		if (isSearching) {
			triggerSearch({ query: searchQuery, page });
		}
	}, [searchQuery, page, triggerSearch, isSearching]);

	function incrementPage() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setPage((currentPage) => Math.min(currentPage + 1, totalPages));
	}

	function decrementPage() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setPage((currentPage) => Math.max(1, currentPage - 1));
	}

	const activeCategory = categories.find(
		(category) => category.id === activeGenre
	);

	const frameTitle = searchQuery
		? 'Search Result'
		: activeCategory?.name || 'Movies';

	const moviesToShow = isSearching ? searchData?.results || [] : genreMovies;
	const isLoading = isSearching ? searchIsLoading : genreIsLoading;
	const totalPages = isSearching
		? searchData?.total_pages || 1
		: data?.total_pages || 1;
	const totalResults = isSearching ? searchData?.total_results : null;

	if (searchQuery && searchError) {
		return <h1>Something went wrong...</h1>;
	}

	return (
		<div className='movie-page'>
			<SearchBar
				onSearch={(query) => {
					if (query === null) {
						setSearchQuery(null);
					} else {
						setSearchQuery(query);
						setPage(1);
					}
				}}
				isLoading={searchIsLoading}
			/>

			<div className='genreButtons'>
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => {
							setActiveGenre(category.id);
							setSearchQuery(null);
						}}
						className={category.id === activeGenre ? 'activeGenre' : ''}
					>
						{category.name}
					</button>
				))}
			</div>

			<div className='mainMovieContainer'>
				{isLoading ? (
					<p>Loading Movies...</p>
				) : searchQuery && moviesToShow.length === 0 ? (
					<div className="noSearchResult">
						<h3>No Results From Search!</h3>
						<p>Try Again With New Title!</p>
					</div>
				) : (
					<MoviesFrame
						movies={moviesToShow}
						title={frameTitle}
						totalPages={totalPages}
						page={page}
						totalResults={totalResults}
						onNextPage={incrementPage}
						onPrevPage={decrementPage}
					/>
				)}
			</div>
		</div>
	);
}

export default MoviePage;

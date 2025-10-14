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

	//när sida ändras uppdateras url (q eller genre)
	useEffect(() => {
		setSearchParams((params) => {
			params.set('page', page.toString());
			if (searchQuery) {
				params.set('q', searchQuery);
			} else {
				params.set('genre', activeGenre.toString());
			}
			return params;
		});
	}, [page, activeGenre, searchQuery, setSearchParams]);

	//Sök start eller sida ändring
	useEffect(() => {
		if (isSearching) {
			triggerSearch({ query: searchQuery, page });
		}
	}, [searchQuery, page, triggerSearch, isSearching]);

	//resettar sidan vid genre ändring
	useEffect(() => {
		if (!isSearching) {
			setPage(1);
			setSearchParams({ genre: activeGenre.toString(), page: '1' });
		}
	}, [activeGenre, setSearchParams, isSearching]);

	//Återställer url vid rensning av sökfält
	useEffect(() => {
		if (!isSearching) {
			const urlGenre = parseInt(searchParams.get('genre')) || 28;
			const urlPage = parseInt(searchParams.get('page')) || 1;
			setActiveGenre(urlGenre);
			setPage(urlPage);
			setSearchParams({ genre: urlGenre.toString(), page: urlPage.toString() });
		}
	}, [setSearchParams, isSearching, searchParams]);

	function incrementPage() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setPage((currentPage) => currentPage + 1);
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

	if (searchQuery && searchError) {
		return <h1>Something went wrong...</h1>;
	}

	return (
		<div className="movie-page">
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

			<div className="genreButtons">
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

			<div className="mainMovieContainer">
				{isLoading ? (
					<p>Loading Movies...</p>
				) : searchQuery && moviesToShow.length === 0 ? (
					<p>no movies found</p>
				) : (
					<MoviesFrame
						movies={moviesToShow}
						title={frameTitle}
						page={page}
						onNextPage={incrementPage}
						onPrevPage={decrementPage}
					/>
				)}
			</div>
		</div>
	);
}

export default MoviePage;

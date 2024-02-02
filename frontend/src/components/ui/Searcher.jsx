import React from 'react'
import SearchSvg from '../../assets/search.svg?react'
import { useParams } from 'react-router-dom';

export const Searcher = ({searchValue, setSearchValue}) => {
	let { search } = useParams();
	search = search ? `Search ${search}` : 'Not available for search';

	return (
		<label htmlFor="search" id='searcher'>
			<input
				type="text"
				id='search'
				placeholder={search}
				value={searchValue}
				onChange={e => setSearchValue(e.target.value.toLowerCase())}
			/>
			<SearchSvg />
		</label>
	)
}

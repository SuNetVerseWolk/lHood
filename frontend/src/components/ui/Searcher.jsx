import React from 'react'
import SearchSvg from '../../assets/search.svg?react'
import { useParams } from 'react-router-dom';

export const Searcher = ({placeholder = 'Search'}) => {
	return (
		<label htmlFor="search" id='searcher'>
			<input type="text" id='search' placeholder={placeholder} />
			<SearchSvg />
		</label>
	)
}

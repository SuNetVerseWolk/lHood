import React from 'react'
import SearchSvg from '../../assets/search.svg?react'

export const Searcher = ({placeholder = 'Search', value, setValue }) => {
	return (
		<label htmlFor="search" id='searcher'>
			<input type="text" id='search' placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
			<SearchSvg />
		</label>
	)
}

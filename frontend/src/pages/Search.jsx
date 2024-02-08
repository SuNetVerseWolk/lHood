import React from 'react'
import { Searcher } from '../components/ui/Searcher';
import FilterList from '../layouts/FilterList';
import { isDeviceType } from '../services/checkDeviceType';

const Search = ({searchValue, setSearchValue, clearSearchValue, userData}) => {
	return (
		<>
			{isDeviceType()?.portable && <Searcher searchValue={searchValue} setSearchValue={setSearchValue} />}
			<FilterList searchValue={searchValue} clearSearchValue={clearSearchValue} userData={userData} />
		</>
	)
}

export default Search;
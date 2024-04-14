import React from 'react';
import { Searcher } from '../components/ui/Searcher';
import FilterList from '../layouts/FilterList';
import { isDeviceType } from '../services/checkDeviceType';
import { searchPage } from 'styles/searchPage.module.css';

const Search = ({searchValue, setSearchValue, clearSearchValue}) => {
	return (
		<div className={searchPage}>
			{isDeviceType()?.portable && <Searcher searchValue={searchValue} setSearchValue={setSearchValue} />}
			<FilterList searchValue={searchValue} clearSearchValue={clearSearchValue} />
		</div>
	)
}

export default Search;
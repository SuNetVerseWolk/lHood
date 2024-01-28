import React from 'react'
import { Searcher } from '../components/ui/Searcher';
import FilterList from '../layouts/FilterList';
import { isDeviceType } from '../services/checkDeviceType';

const Search = ({value, search, setSearch}) => {
	return (
		<>
			{isDeviceType()?.portable && <Searcher placeholder={'Search ' + value} value={search} setValue={setSearch} />}
			<FilterList search={search} setSearch={setSearch} />
		</>
	)
}

export default Search;
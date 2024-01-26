import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Searcher } from '../../../components/ui/Searcher';
import { FilterList } from '../../../layouts/FilterList';

export const PageSearchContainer = () => {
	const [search, setSearch] = useState('');
	const { value } = useParams();

	return (
		<>
			<Searcher placeholder={'Search ' + value} value={search} setValue={setSearch} />
			<FilterList search={search} />
		</>
	)
}
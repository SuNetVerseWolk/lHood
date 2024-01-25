import React from 'react'
import { useParams } from 'react-router-dom'
import { Searcher } from '../../../components/ui/Searcher';
import { FilterList } from '../../../layouts/FilterList';

export const PageSearchContainer = () => {
	const { value } = useParams();

	return (
		<>
			<Searcher placeholder={'Search ' + value} />
			<FilterList />
		</>
	)
}

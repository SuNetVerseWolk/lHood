import React from 'react'
import { useParams } from 'react-router-dom'
import { Empty } from '../layouts/Empty';
import { Searcher } from '../components/ui/Searcher';

export const Filter = () => {
	const { learnType } = useParams();
	const data = null;

	return (
		<>
			<Searcher placeholder={'Search ' + learnType} />
			{data ? <div id='menuPage'>
				Recall
			</div> :
			<Empty>Range of {learnType}'s empty</Empty>}
		</>
	)
}

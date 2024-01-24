import React from 'react'
import { Empty } from '../layouts/Empty';
import { Searcher } from '../components/ui/Searcher';

export const LearnSources = () => {
	const data = null;

	return (
		<>
			<Searcher />
			{data ? <div id='menuPage'>
				Recall
			</div> :
			<Empty><p>Ur source stack is empty</p></Empty>}
		</>
	)
}

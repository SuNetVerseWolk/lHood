import React from 'react'
import { Empty } from '../layouts/Empty';
import { useMatch } from 'react-router-dom';

export const Recall = () => {
	const match = useMatch('./*');
	const data = null;

	return (
		<>
			{data ? <div id='menuPage'>
				Recall
			</div> :
			<Empty>There's none, to remind</Empty>}
		</>
	)
}

import React from 'react'
import { Empty } from '../layouts/Empty';

export const Recall = () => {
	const data = null;

	return (
		<>
			{data ? <div id='menuPage'>
				Recall
			</div> :
			<Empty><p>There's none, to remind</p></Empty>}
		</>
	)
}

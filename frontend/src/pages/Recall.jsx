import React from 'react'
import Empty from '../layouts/Empty';

const Recall = () => {
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

export default Recall;
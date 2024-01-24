import React from 'react'
import { Empty } from '../layouts/Empty'
import { Searcher } from '../components/ui/Searcher';

export const People = () => {
	const data = null;

	return (
		<>
			<Searcher placeholder='Search people'/>
			{data ? <div id='menuPage'>
				People
			</div> :
			<Empty><p>There's none people<br/>U communicate with</p></Empty>}
		</>
	)
}

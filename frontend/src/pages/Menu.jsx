import React from 'react'
import { Empty } from '../layouts/Empty';

export const Menu = () => {
	const data = null;

	return (
		<>
			{data ? <div id="menuPage">

			</div> : <Empty>Menu</Empty>}
		</>
	)
}
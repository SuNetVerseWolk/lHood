import React from 'react'
import Empty from '../layouts/Empty';

const Menu = () => {
	const data = null;

	return (
		<>
			{data ? <div id="menuPage">

			</div> : <Empty>Menu</Empty>}
		</>
	)
}

export default Menu;
import React from 'react'

const Empty = ({children = 'Empty'}) => {
	return (
		<div className="empty">
			<h3>{children}</h3>
		</div>
	)
}

export default Empty;
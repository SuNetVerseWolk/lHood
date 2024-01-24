import React from 'react'

export const Empty = ({children = 'Empty'}) => {
	return (
		<div className="empty">
			<h3>{children}</h3>
		</div>
	)
}

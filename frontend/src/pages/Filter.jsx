import React from 'react'
import { useParams } from 'react-router-dom'

export const Filter = () => {
	const { learnType } = useParams();

	return (
		<div className="empty">
			<h3>Filter {learnType}</h3>
		</div>
	)
}

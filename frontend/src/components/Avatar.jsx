import React from 'react'
import { NavLink } from 'react-router-dom'

export const Avatar = ({src, href}) => {
	return (
		<NavLink to={href}>
			<img className='avatar' src={src} alt="avatar" />
		</NavLink>
	)
}

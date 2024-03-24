import React from 'react'
import { NavLink } from 'react-router-dom'
import profileGif from '../assets/userNoPhoto.webp'

const Avatar = ({src, href, setIsShown, shouldIsShown}) => {
	return (
		<NavLink to={href}>
			<img
				src={src || ''}
				alt="avatar"
				className='avatar'
				onError={(e) => {
					if (shouldIsShown) {
						e.target.src = profileGif
					}

					else setIsShown(false);
				}}
			/>
		</NavLink>
	)
}

export default Avatar;
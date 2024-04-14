import React from 'react'
import { NavLink } from 'react-router-dom'
import userNoPhoto_Webp from '/userNoPhoto.webp'

const Avatar = ({src, href, setIsShown, shouldIsShown, style}) => {
	return (
		<NavLink className={`avatar ${style}`} to={href}>
			<img
				src={src || ''}
				alt="avatar"
				onError={(e) => {
					if (shouldIsShown) {
						e.target.src = userNoPhoto_Webp
					}

					else setIsShown(false);
				}}
			/>
		</NavLink>
	)
}

export default Avatar;
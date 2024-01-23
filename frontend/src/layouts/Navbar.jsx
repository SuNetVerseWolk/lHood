import React from 'react'

export const Navbar = ({children, flexDirection, justifyContent, alignItems, width}) => {
	return (
		<nav className='navbar' style={{flexDirection, justifyContent, alignItems, width}}>
			{children}
		</nav>
	)
}

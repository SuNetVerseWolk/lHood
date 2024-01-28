import React from 'react'

const Navbar = ({children, flexDirection, justifyContent, alignItems, width}) => {
	return (
		<nav className='navbar' style={{flexDirection, justifyContent, alignItems, width}}>
			{children}
		</nav>
	)
}

export default Navbar
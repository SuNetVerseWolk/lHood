import React from 'react'

const Navbar = ({children, flexDirection, justifyContent, alignItems, width, link}) => {
	return (
		<nav ref={link} className='navbar' style={{flexDirection, justifyContent, alignItems, width}}>
			{children}
		</nav>
	)
}

export default Navbar
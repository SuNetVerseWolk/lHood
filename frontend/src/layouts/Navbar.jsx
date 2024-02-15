import React from 'react'

const Navbar = ({innerRef, children, flexDirection, justifyContent, alignItems, width}) => {
	return (
		<nav
			ref={innerRef}
			className='navbar'
			style={{flexDirection, justifyContent, alignItems, width}}
		>
			{children}
		</nav>
	)
}

export default Navbar
import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../../layouts/Navbar'

const Header = ({children}) => {
	return (
		<header>
			{children}
			<Navbar>
				<NavLink to={'get/learned'} className={'learned'}>1595</NavLink>
				<NavLink to={'get/learning'} className={'learning'}>197</NavLink>
				<NavLink to={'get/gonnaLearn'} className={'gonnaLearn'}>1715</NavLink>
			</Navbar>
		</header>
	)
}

export default Header;
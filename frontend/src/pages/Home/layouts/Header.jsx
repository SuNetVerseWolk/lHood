import React from 'react'
import { TextButton } from '../../../components/ui/TextButton'
import { Navbar } from '../../../layouts/Navbar'
import { NavLink } from 'react-router-dom'

export const Header = ({children}) => {
	return (
		<header>
			{children}
			<Navbar>
				<NavLink to={'/filter/learned'} className={'learned'}>1595</NavLink>
				<NavLink to={'/filter/learning'} className={'learning'}>197</NavLink>
				<NavLink to={'/filter/gonnaLearn'} className={'gonnaLearn'}>1715</NavLink>
			</Navbar>
		</header>
	)
}
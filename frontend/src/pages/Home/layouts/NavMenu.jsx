import React from 'react'
import { Navbar } from '../../../layouts/Navbar'
import PeopleBtn from '../../../assets/people.svg?react'
import RecallBtn from '../../../assets/recall.svg?react'
import LearnSourcesBtn from '../../../assets/learnSources.svg?react'
import { NavLink, useMatch } from 'react-router-dom'

export const NavMenu = ({children}) => {
	const match = useMatch('/lHood');

	return (
		<div className='navMenu'>
			{children}
			<Navbar width={'100%'}>
				<NavLink to={'/search/people'}>
					<PeopleBtn />
				</NavLink>
				<NavLink to={'/recall'} className={Boolean(match) ? "active" : ""} >
					<RecallBtn />
				</NavLink>
				<NavLink to={'/search/local'}>
					<LearnSourcesBtn />
				</NavLink>
			</Navbar>
		</div>
	)
}

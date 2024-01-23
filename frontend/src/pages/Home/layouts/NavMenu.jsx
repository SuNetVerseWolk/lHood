import React from 'react'
import { Navbar } from '../../../layouts/Navbar'
import PeopleBtn from '../../../assets/people.svg?react'
import RecallBtn from '../../../assets/recall.svg?react'
import LearnSourcesBtn from '../../../assets/learnSources.svg?react'
import { NavLink } from 'react-router-dom'

export const NavMenu = ({children}) => {
	return (
		<div className='navMenu'>
			{children}
			<Navbar width={'100%'}>
				<NavLink to={'/people'}>
					<PeopleBtn />
				</NavLink>
				<NavLink to={'/recall'}>
					<RecallBtn />
				</NavLink>
				<NavLink to={'/learnSourcesBtn'}>
					<LearnSourcesBtn />
				</NavLink>
			</Navbar>
		</div>
	)
}

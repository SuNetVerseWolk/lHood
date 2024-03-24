import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import Navbar from '../../../layouts/Navbar'
import PeopleBtn from '../../../assets/people.svg?react'
import RecallBtn from '../../../assets/recall.svg?react'
import LearnSourcesBtn from '../../../assets/learnSources.svg?react'

const NavMenu = ({children}) => {
	const match = useMatch('/lHood/');

	return (
		<div className='navMenu'>
			{children}
			<Navbar width={'100%'}>
				<NavLink to={'people/filter/all'}>
					<PeopleBtn />
				</NavLink>
				<NavLink to={'recall'} className={match && 'active'} >
					<RecallBtn />
				</NavLink>
				<NavLink to={'patterns/filter/all'}>
					<LearnSourcesBtn />
				</NavLink>
			</Navbar>
		</div>
	)
}

export default NavMenu;
import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../../layouts/Navbar'
import { isDeviceType } from '../../../services/checkDeviceType'
import { Searcher } from '../../../components/ui/Searcher'

const Header = ({children, searchValue, setSearchValue}) => {
	return (
		<header>
			{children}

			{isDeviceType()?.largeScreen && <Searcher value={searchValue} setValue={setSearchValue} />}
			<Navbar>
				<NavLink to={'patterns/filter/learned'} className={'learned'}>1595</NavLink>
				<NavLink to={'patterns/filter/learning'} className={'learning'}>197</NavLink>
				<NavLink to={'patterns/filter/gonnaLearn'} className={'gonnaLearn'}>1715</NavLink>
			</Navbar>
		</header>
	)
}

export default Header;
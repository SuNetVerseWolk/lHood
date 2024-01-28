import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../../../layouts/Navbar'
import { isDeviceType } from '../../../services/checkDeviceType'
import { Searcher } from '../../../components/ui/Searcher'

const Header = ({children, value, search, setSearch}) => {
	return (
		<header>
			{children}
			
			{isDeviceType()?.largeScreen && <Searcher placeholder={'Search ' + value} value={search} setValue={setSearch} />}
			<Navbar>
				<NavLink to={'get/learned'} className={'learned'}>1595</NavLink>
				<NavLink to={'get/learning'} className={'learning'}>197</NavLink>
				<NavLink to={'get/gonnaLearn'} className={'gonnaLearn'}>1715</NavLink>
			</Navbar>
		</header>
	)
}

export default Header;
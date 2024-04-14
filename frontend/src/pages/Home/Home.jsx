import React from 'react'
import { Outlet } from 'react-router-dom'
import { isDeviceType } from '../../services/checkDeviceType'
import Header from './layouts/Header'
import Avatar from '../../components/Avatar'
import NavMenu from './layouts/NavMenu'

const Home = ({ searchValue, setSearchValue }) => {
	const deviceType = isDeviceType();
	const avatarEl = <Avatar href='profile' shouldIsShown={true} />;

	return (
		<>
			<Header search={searchValue} setSearch={setSearchValue}>
				{deviceType?.portable && avatarEl}
			</Header>
			<main>
				<Outlet />
			</main>
			<NavMenu>
				{deviceType?.largeScreen && avatarEl}
			</NavMenu>
		</>
	)
}

export default Home;
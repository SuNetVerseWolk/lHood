import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { isDeviceType } from '../../services/checkDeviceType'
import Header from './layouts/Header'
import Avatar from '../../components/Avatar'
import NavMenu from './layouts/NavMenu'
import avatar from '../../assets/profileGif.gif'

const Home = ({searchValue, setSearchValue}) => {
	const deviceType = isDeviceType();
	const avatarEl = <Avatar src={avatar} href={'menu'} />;

	return (
		<>
			<Header search={searchValue} setSearch={setSearchValue}>
				{deviceType?.portable && avatarEl}
			</Header>
			<main>
				<Outlet/>
			</main>
			<NavMenu>
				{deviceType?.largeScreen && avatarEl}
			</NavMenu>
		</>
	)
}

export default Home;
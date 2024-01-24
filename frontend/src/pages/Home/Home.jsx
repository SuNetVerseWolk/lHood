import React from 'react'
import { Header } from './layouts/Header'
import { PageContainer } from './layouts/PageContainer'
import { NavMenu } from './layouts/NavMenu'
import {isDeviceType} from '../../services/checkDeviceType'
import { Avatar } from '../../components/Avatar'
import avatar from '../../assets/profileGif.gif'

export const Home = () => {
	const deviceType = isDeviceType();
	const avatarEl = <Avatar src={avatar} href={'/menu'} />;

	return (
		<>
			<Header>
				{console.log()}
				{deviceType?.portable && avatarEl}
			</Header>
			<PageContainer />
			<NavMenu>
				{deviceType?.largeScreen && avatarEl}
			</NavMenu>
		</>
	)
}
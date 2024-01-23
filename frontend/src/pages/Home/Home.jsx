import React from 'react'
import { Header } from './layouts/Header'
import { PageContainer } from './layouts/PageContainer'
import { NavMenu } from './layouts/NavMenu'
import {isDevice} from '../../services/checkDevice'
import { Avatar } from '../../components/Avatar'
import avatar from '../../assets/profileGif.gif'
import { Recall } from '../Recall'

export const Home = () => {
	return (
		<>
			<Header>
				{console.log()}
				{isDevice().portable &&
					<Avatar src={avatar} />
				}
			</Header>
			<PageContainer />
			<NavMenu>
				{isDevice().largeScreen &&
					<Avatar src={avatar} />
				}
			</NavMenu>
		</>
	)
}
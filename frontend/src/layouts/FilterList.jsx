import React from 'react'
import { Empty } from './Empty'
import { useParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { user } from '../data/user'

export const FilterList = ({search}) => {
	const { value } = useParams();
	const sortedUserData = {
		...user,
		[value]: user[value] ?
			[...user[value]].filter(item => item.name.includes(search)) :
			user[value]
	};

	return (
		<div id='filterList'>
			{
				sortedUserData[value] &&
				sortedUserData[value].map(item => {
					return (
						<div key={item.name}>
							{item?.img && <Avatar src={item.img} href='' />}
							{item?.name && <p>{item.name}</p>}
						</div>
					)
				}) ||
				<Empty />
			}
		</div>
	)
}

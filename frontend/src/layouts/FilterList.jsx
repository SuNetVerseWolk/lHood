import React from 'react'
import { Empty } from './Empty'
import { useParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import avatar from '../assets/profileGif.gif'

const user = {
	name: 'Wolk',
	people: [{name: 'John Doe', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}, {name: 'Mis. Stefany', img: avatar}],
	learned: [{name: 'something'}],
	learning: [{name: 'word'}]
}

export const FilterList = () => {
	const { value } = useParams();
	console.log(value)

	return (
		<div id='filterList'>
			{
				user[value] &&
				user[value].map(item => {
					console.log(item)
					return (
						<div>
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

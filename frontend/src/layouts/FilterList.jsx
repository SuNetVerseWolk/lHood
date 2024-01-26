import React, { useEffect, useState } from 'react'
import { Empty } from './Empty'
import { useParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { user, people } from '../data/user'
import { Item } from '../components/Item'

export const FilterList = ({search, setSearch}) => {
	const { value } = useParams();
	const [sortedUserData, setSortedUserData] = useState([]);

	const getSortedPeople = () => {
		if (value === 'people' && search[0] === '$') {
			if (user[value].includes(search)) return;
			const {name, img} = people.find(person => person.key === search) || {};

			if (name && img)
				return (
					<Item to={value} itemKey={search} key={search}>
						{img && <Avatar src={img} href='' />}
						{name && <p id='name'>{name}</p>}
						<button style={{color: 'var(--accentColor)'}} onClick={e => {
							user[value].push(search);
							setSearch('');
						}}>+</button>
					</Item>
				)
		}
	}

	useEffect(e => {
		let items;
		if (value === 'people') {
			items = people.filter(person => user[value].includes(person.key));
			items = items.filter(item => item.name?.toLowerCase().includes(search));
		}
		else {
			items = user[value]?.filter(item => item.name?.toLowerCase().includes(search));
		}

		setSortedUserData(items);
	}, [value, search])

	return (
		<div id='filterList' key={'filterList'}>
			{getSortedPeople()}
			{
				sortedUserData?.length > 0 &&
				sortedUserData?.map(item => {
					const {name, img, key} = item || {}
					return (
						<Item to={value} key={key} itemKey={key}>
							{img && <Avatar src={item.img} href='' />}
							{name && <p>{item.name}</p>}
						</Item>
					)
				}) ||
				<Empty />
			}
		</div>
	)
}

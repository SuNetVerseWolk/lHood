import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from '../data/user'
import Item from '../components/Item'
import Empty from './Empty'
import GlobalSearchItems from './globalSearchItems'
import { getPeople } from '../services/dataMenagement'

const FilterList = ({search, setSearch}) => {
	const { value } = useParams();
	const [sortedUserData, setSortedUserData] = useState([]);

	let id = search.slice(1);
	let mark = search[0];

	useEffect(e => {
		let items;
		if (value === 'people') {
			const people = getPeople(data.people, data.user);
			if (mark === '#')
				items = people?.filter(item => item.id?.toLowerCase().includes(search.slice(1)));
			else
				items = people?.filter(item => item.name?.toLowerCase().includes(search));
		}
		else
			items = data.user[value]?.filter(item => item.name?.toLowerCase().includes(search));

		setSortedUserData(items?.map(item => {
			const {name, img, id} = item || {}
			return (
				<Item name={name} img={img} id={id} key={id || name} />
			)
		}));
	}, [value, search])

	return (
		<div id='filterList'>
			<GlobalSearchItems mark={mark} id={id} setSearch={setSearch} />
			{ sortedUserData?.length ? sortedUserData : <Empty /> }
		</div>
	)
}

export default FilterList;
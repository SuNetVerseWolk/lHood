import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from '../data/user'
import Item from '../components/Item'
import Empty from './Empty'
import GlobalSearchItems from './globalSearchItems'
import { getPeople } from '../services/dataMenagement'

const FilterList = ({searchValue, clearSearchValue}) => {
	const { search } = useParams();
	const [sortedUserData, setSortedUserData] = useState([]);

	let id = searchValue.slice(1);
	let mark = searchValue[0];

	useEffect(e => {
		let items;
		if (search === 'people') {
			const people = getPeople(data.people, data.user);
			if (mark === '#')
				items = people?.filter(item => item.id?.toLowerCase().includes(searchValue.slice(1)));
			else
				items = people?.filter(item => item.name?.toLowerCase().includes(searchValue));
		}
		else
			items = data.user[search]?.filter(item => item.name?.toLowerCase().includes(searchValue));

		setSortedUserData(items?.map((item, i) => {
			const {name, img, id} = item || {}
			return (
				<Item name={name} img={img} id={id} key={id || name} i={i} />
			)
		}));
	}, [search, searchValue])

	return (
		<div id='filterList'>
			<GlobalSearchItems search={search} mark={mark} id={id} clearSearchValue={clearSearchValue} />
			{ sortedUserData?.length ? sortedUserData : <Empty /> }
		</div>
	)
}

export default FilterList;
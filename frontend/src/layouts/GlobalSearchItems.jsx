import React from 'react'
import Item from '../components/Item';
import AddPeopleSvg from '../assets/addPeople.svg?react'
import { people } from '../data/user';

const GlobalSearchItems = ({ mark, id, clearSearchValue, search, userData }) => {
	if (!id) return;

	if (search === 'people' && mark === '#')
		if (!userData.data[search]?.includes(id)) {
			const {name, img} = people?.find(item => item.id === id) || {};
			if (name && img)
				return (
					<Item name={name} img={img} id={id}>
						<AddPeopleSvg onClick={e => {
							e.stopPropagation();
							userData.addPeople(id);
							clearSearchValue();
						}}/>
					</Item>
				)
		}
}

export default GlobalSearchItems
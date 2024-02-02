import React from 'react'
import { useParams } from 'react-router-dom';
import data from '../data/user';
import Item from '../components/Item';
import AddPeopleSvg from '../assets/addPeople.svg?react'

const GlobalSearchItems = ({ mark, id, clearSearchValue, search }) => {
	if (!id) return;

	if (search === 'people' && mark === '#')
		if (!data.user[search]?.includes(id)) {
			const {name, img} = data[search]?.find(item => item.id === id) || {};
			if (name && img)
				return (
					<Item name={name} img={img} id={id}>
						<AddPeopleSvg onClick={e => {
							e.stopPropagation();
							if (!data.user[search]) data.user[search] = [];
							data.user[search]?.push(id);
							clearSearchValue();
						}}/>
					</Item>
				)
		}
}

export default GlobalSearchItems
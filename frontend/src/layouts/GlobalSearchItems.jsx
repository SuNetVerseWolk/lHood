import React from 'react'
import { useParams } from 'react-router-dom';
import data from '../data/user';
import Item from '../components/Item';

const GlobalSearchItems = ({ mark, id, setSearch }) => {
	if (!id) return;
	const { value } = useParams();

	if (value === 'people' && mark === '#')
		if (!data.user[value]?.includes(id)) {
			const {name, img} = data[value]?.find(item => item.id === id) || {};
			if (name && img)
				return (
					<Item name={name} img={img} id={id}>
						<button style={{color: 'var(--accentColor)'}} onClick={e => {
							if (!data.user[value]) data.user[value] = [];
							data.user[value]?.push(id);
							setSearch('');
						}}>+</button>
					</Item>
				)
		}
}

export default GlobalSearchItems
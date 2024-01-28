import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar';

const Item = ({children, id, name, img}) => {
	const navigate = useNavigate();

	return (
		<div
			className='item'
			onClick={(e) => {
				if (e.target.tagName !== 'BUTTON')
					navigate(id);
			}}
		>
			{img && <Avatar src={img} href='' />}
			<p id='name'>{name}</p>
			{children}
		</div>
	)
}

export default Item;
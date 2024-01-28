import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Avatar from './Avatar';

const Item = ({children, id, name, img}) => {
	const navigate = useNavigate();

	return (
		<div
			className='item'
			onClick={(e) => navigate(id)}
		>
			<div id="main">
				{img && <Avatar src={img} href='' />}
				<p id='name'>{name}</p>
			</div>
			{
				children &&
				<Navbar>
					{children}
				</Navbar>
			}
		</div>
	)
}

export default Item;
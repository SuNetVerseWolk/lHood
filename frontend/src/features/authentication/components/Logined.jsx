import React, { useEffect } from 'react'
import { isLogined } from '../../../data/user'
import Menu from '../../../pages/Menu'
import { useNavigate } from 'react-router-dom';

function Logined({ children }) {
	const navigate = useNavigate();

	useEffect(e => {
		if (!isLogined()) {
			navigate('/lHood/menu')
		}
	}, []);

	return (
		<>
			{
				isLogined() && (
					children
				) || (
					<Menu/>
				)
			}
		</>
	)
}

export default Logined
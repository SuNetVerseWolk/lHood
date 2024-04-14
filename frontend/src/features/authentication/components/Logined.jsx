import React, { useEffect } from 'react'
import { isLogined } from '../../../data/user'
import { useNavigate } from 'react-router-dom';
import Profile from '../../../pages/Profile';

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
					<Profile />
				)
			}
		</>
	)
}

export default Logined
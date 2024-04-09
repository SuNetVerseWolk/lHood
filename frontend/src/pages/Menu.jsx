import React, { useState } from 'react'
import RegistrationForm from '../components/form/SignForm'
import { useQuery } from '@tanstack/react-query'
import Empty from '../layouts/Empty'

const Menu = () => {
	const
		[userID, setUserID] = useState(localStorage.getItem('userID')),
		data = useQuery({
			queryKey: [userID],
			queryFn: async (userId) => {
				return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
					.then((res) => res.json())
			}
		})

	return (
		<>
			{userID ? (
				data ? (
					<div id="menuPage">

					</div>
				) : (
					<Empty>Loading...</Empty>
				)
			) : <RegistrationForm setUserID={setUserID} />}
		</>
	)
}

export default Menu;
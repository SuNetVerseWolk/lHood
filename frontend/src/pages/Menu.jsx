import React, { useState } from 'react'
import RegistrationForm from '../components/form/SignForm'
import { useQuery } from '@tanstack/react-query'
import Empty from '../layouts/Empty'
import axios from 'axios'
import getDataAPI from '../data/getDataAPI'

const Menu = () => {
	const
		[userID, setUserID] = useState(localStorage.getItem('userID')),
		{data} = useQuery({
			queryKey: [userID],
			queryFn: e => getDataAPI(`person/${userID}`)
		})

	return (
		<>
			{userID ? (
				data ? (
					<div id="menuPage">
						<h1>{data.name}</h1>
						<code>{JSON.stringify(data)}</code>
					</div>
				) : (
					<Empty>Loading...</Empty>
				)
			) : <RegistrationForm setUserID={setUserID} />}
		</>
	)
}

export default Menu;
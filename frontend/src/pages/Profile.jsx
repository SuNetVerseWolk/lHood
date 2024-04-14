import React, { useState } from 'react'
import SignForm from '../components/form/SignForm'
import { useQuery } from '@tanstack/react-query'
import Empty from '../layouts/Empty'
import getDataAPI from '../data/getDataAPI'

const Profile = () => {
	const
		[userID, setUserID] = useState(localStorage.getItem('userID')),
		{data} = useQuery({
			queryKey: [userID],
			queryFn: e => userID && getDataAPI(`person/${userID}`)
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
			) : <SignForm setUserID={setUserID} />}
		</>
	)
}

export default Profile;
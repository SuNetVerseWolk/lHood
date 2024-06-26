import React, { useState } from 'react'
import SignForm from '../components/form/SignForm'
import { useQuery } from '@tanstack/react-query'
import Empty from '../layouts/Empty'
import getDataAPI from '../data/getDataAPI'
import Image, { fonImage } from '../components/ui/Image'
import { profilePage, profile, avatar, user, columnSvg } from 'styles/profile.module.css'
import Avatar from 'components/Avatar'
import { motion } from 'framer-motion'
import ThreeDotColumnSvg from 'components/svg/ThreeDotColumnSvg'

const Profile = () => {
	const
		[userID, setUserID] = useState(localStorage.getItem('userID')),
		{ data, isLoading } = useQuery({
			queryKey: [userID],
			queryFn: e => userID && getDataAPI(`person/${userID}`)
		})

	return (
		<>
			{userID ? (
				isLoading ? (
					<Empty>Loading...</Empty>
				) : (
					<div className={profilePage}>
						<Image src={data.fon} style={fonImage} isEditable={false} alt='profileFon' />
						<ThreeDotColumnSvg style={columnSvg} />
						<div className={profile}>
							<div className={user}>
								<h1>{data.name}</h1>
								<Avatar style={avatar} src={data.avatar} shouldIsShown={true}/>
							</div>
						</div>
					</div>
				)
			) : <SignForm setUserID={setUserID} />}
		</>
	)
}

export default Profile;
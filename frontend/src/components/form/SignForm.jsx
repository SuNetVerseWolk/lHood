import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import style, { registrationForm } from '../../styles/registrationForm.module.css'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

function RegistrationForm({ setUserID }) {
	const
		[searchParams] = useSearchParams(),
		types = useMemo(e => ['up', 'in'], []),
		type = useMemo(e => types.filter(inType => inType != searchParams.get('signType'))[0], [searchParams]),
		isUp = useMemo(e => type !== types[0], [type])

	const { mutate } = useMutation({
		mutationFn: (data) => axios.post('/api/sign', data),
		onError: error => console.log(error),
		onSuccess: e => {
			setUserID(e.id);
			isUp && localStorage.setItem('userID', e.id);
		}
	})

	const handleSubmit = e => {
		e.preventDefault();

		const
			password = e.target.password,
			confirmPassword = e.target.confirmPassword

		if (isUp && password.value !== confirmPassword.value) {
			confirmPassword.setCustomValidity('Passwords is not the same!')
			return confirmPassword.reportValidity();
		}

		mutate(Object.fromEntries(new FormData(e.target).entries()));
	}

	return (
		<motion.form
			id={registrationForm}
			animate={{ scale: 1 }}
			initial={{ scale: .9 }}
			onSubmit={handleSubmit}
		>
			<h1>Sign</h1>
			<input name='email' type="email" placeholder='Email address' autoComplete='email' required />
			<input id='password' name='password' type="password" placeholder='Password' autoComplete='current-password' required />
			{isUp && (
				<motion.input
					name='confirmPassword'
					type="password"
					placeholder='Confirm Password'
					autoComplete='current-password'
					onInput={e => e.target.setCustomValidity('')}
					required

					animate={{ scale: 1 }}
					initial={{ scale: .9 }}
				/>
			)}
			<motion.button whileTap={{ scale: .9 }}>{types.filter(inType => inType != type)}</motion.button>

			<NavLink to={`../menu?signType=${type}`} id={style.up}>{type}</NavLink>
		</motion.form>
	)
}

export default RegistrationForm
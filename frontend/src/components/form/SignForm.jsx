import React, { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import style, { registrationForm } from '../../styles/registrationForm.module.css'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const handleInput = e => e.target.setCustomValidity('');

function RegistrationForm({ setUserID }) {
	const
		[searchParams] = useSearchParams(),
		types = useMemo(e => ['in', 'up'], []),
		type = searchParams.get('signType') || types[0],
		nextType = useMemo(e => types.filter(inType => inType != type)[0], [searchParams]),
		isUp = useMemo(e => type === types[1], [type]),
		[emailRef, passwordRef, confirmPasswordRef] = [useRef(), useRef(), useRef()]

	const { mutate } = useMutation({
		mutationFn: (data) => axios.post(`/api/sign/${type}`, data),
		onError: error => {
			switch (error.response.status) {
				case 404:
					emailRef.current.setCustomValidity('User not found');
					emailRef.current.reportValidity();
					break;
				case 403:
					passwordRef.current.setCustomValidity('Password\'s incorrect');
					passwordRef.current.reportValidity();

					if (isUp) {
						confirmPasswordRef.current.setCustomValidity('Don\'t forget to correct it too')
						passwordRef.current.reportValidity();
					}

					break;

				default:
					console.log(error)
					break;
			}
		},
		onSuccess: res => {
			setUserID(res.data.id);
			localStorage.setItem('userID', res.data.id);
		}
	})

	const handleSubmit = e => {
		e.preventDefault();

		if (isUp && passwordRef.current.value !== confirmPasswordRef.current.value) {
			confirmPasswordRef.current.setCustomValidity('Passwords isn\'t the same!')
			return confirmPasswordRef.current.reportValidity();
		}
		
		console.log(1)
		mutate(Object.fromEntries(new FormData(e.target).entries()));
	}

	useEffect(e => {
		emailRef.current.setCustomValidity('');
		passwordRef.current.setCustomValidity('');
		isUp && confirmPasswordRef.current.setCustomValidity('');
	}, [type])

	return (
		<motion.form
			id={registrationForm}
			animate={{ scale: 1 }}
			initial={{ scale: .9 }}
			onSubmit={handleSubmit}
		>
			<h1>Sign</h1>
			<input
				name='email'
				type="email"
				placeholder='Email address'
				autoComplete='email'
				required

				ref={emailRef}
				onInput={handleInput}
			/>
			<input
				id='password'
				name='password'
				type="password"
				placeholder='Password'
				autoComplete='current-password'
				required

				ref={passwordRef}
				onInput={handleInput}
			/>
			{isUp && (
				<motion.input
					type="password"
					placeholder='Confirm Password'
					autoComplete='current-password'
					required

					ref={confirmPasswordRef}
					onInput={handleInput}

					animate={{ scale: 1 }}
					initial={{ scale: .9 }}
				/>
			)}
			<motion.button whileTap={{ scale: .9 }}>{type}</motion.button>

			<NavLink to={`../menu?signType=${nextType}`} id={style.up}>{nextType}</NavLink>
		</motion.form>
	)
}

export default RegistrationForm
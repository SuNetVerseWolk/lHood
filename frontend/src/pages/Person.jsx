import React from 'react'
import { useParams } from 'react-router-dom'
import { people } from '../data/user';

export const Person = () => {
	const {key} = useParams();
	const {name, img} = people.find(person => person.key === key);

	console.clear()
	console.log(key)
	return (
		<>
			<h1>{name}</h1>
			<img src={img} alt={`Foto de ${name}`} />
		</>
	)
}

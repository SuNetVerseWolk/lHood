import React from 'react'
import { useParams } from 'react-router-dom'
import data from '../data/user';

const Person = () => {
	const { id } = useParams();
	const { name, img } = data.people.find(person => person.id === id);

	return (
		<>
			<h1>{name}</h1>
			<img src={img} alt={`Foto de ${name}`} />
		</>
	)
}

export default Person
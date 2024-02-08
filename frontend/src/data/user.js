import { useState } from 'react';
import avatar from '../assets/profileGif.gif'

export const people = [
	{id: '0', name: 'John Doe', img: avatar},
	{id: '1', name: 'Mis. Sarahj', img: avatar},
	{id: '2', name: 'Mis. Emilyl', img: avatar},
	{id: '3', name: 'Mis. Sophian', img: avatar},
	{id: '4', name: 'Mis. Isabellan', img: avatar},
	{id: '5', name: 'Mis. b', img: avatar},
	{id: '6', name: 'Mis. Mian', img: avatar},
	{id: '7', name: 'Mis. Charlotteb', img: avatar},
	{id: '8', name: 'Mis. Oliviab', img: avatar},
	{id: '9', name: 'Mis. Ameliav', img: avatar},
	{id: 'a', name: 'Mis. Harperv', img: avatar},
	{id: 'a1', name: 'Mis. Sarahh', img: avatar},
	{id: 'a2', name: 'Mis. Emilyi', img: avatar},
	{id: 'a3', name: 'Mis. Sophiaj', img: avatar},
	{id: 'a4', name: 'Mis. Isabella', img: avatar},
	{id: 'a5', name: 'Mis. Ava', img: avatar},
	{id: 'a6', name: 'Mis. Mia', img: avatar},
	{id: 'a7', name: 'Mis. Charlotte', img: avatar},
	{id: 'a8', name: 'Mis. Olivia', img: avatar},
	{id: 'a9', name: 'Mis. Amelia', img: avatar},
	{id: 'b', name: 'Mis. Harper', img: avatar}
]

const useUserDataManager = (data = {img: avatar, people: [], local: []}) => {
	const [userData, setUserData] = useState(data);

	const addToLocal = (item) => {
		setUserData({...userData, local: [...userData.local, item]});
	};

	const removeFromLocal = (index) => {
		setUserData({...userData, local: userData.local.splice(index, 1)});
	};

	const addPeople = (item) => {
		setUserData({...userData, people: [...userData.people, item]});
	};

	const removeFromPeople = (index) => {
		setUserData({...userData, people: userData.people.splice(index, 1)});
	};

	return {
		addToLocal,
		removeFromLocal,
		addPeople,
		removeFromPeople,
		data: userData,
	};
};

export default useUserDataManager;
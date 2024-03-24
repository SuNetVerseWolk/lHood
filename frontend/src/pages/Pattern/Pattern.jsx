import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pattern } from '../../styles/pattern.module.css'
import Image from '../../components/ui/Image'
import ScrollList from '../../layouts/ScrollList'
import Tools from './Tools'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Pattern = () => {
	const navigate = useNavigate();
	const defaultCardValue = useMemo(e => JSON.parse(import.meta.env.VITE_DefaultCardValue), []);
	const { value } = useParams();
	const isNew = useMemo(e => value === import.meta.env.VITE_NEWDATAKEY, [value]);
	const [isEditable, setIsEditable] = useState(value === import.meta.env.VITE_NEWDATAKEY);
	const [cards, setCards] = useState([]);
	const { data, isLoading } = useQuery({
		queryKey: ['patterns'],
		queryFn: () => {
			if (isNew) return {cards};

			return axios.get(`/api/patterns/${value}`).then(res => {
				const data = res.data;

				setCards(data?.cards || []);

				return data;
			})
		},
		enabled: !isEditable
	})
	const [currentCardId, setCurrentCardId] = useState(0);
	const isNewCardCurrent = useMemo(e => currentCardId === cards?.length, [currentCardId, cards]);
	const [newCard, setNewCard] = useState({});
	const [newTip, setNewTip] = useState({});

	const image = useMemo(e => {
		return {
			src: isNewCardCurrent ? newCard?.img : cards[currentCardId]?.img,
			alt: 'Pattern Image',
			isEditable,
			currentCardId: currentCardId,
			setImage: (img) => {
				if (isNewCardCurrent)
					setNewCard(prev => ({ ...prev, img }));
				else
				setCards(prev => {
					prev[currentCardId] = {...prev[currentCardId], img}
	
					return [...prev];
				});
			}
		}
	}, [isNewCardCurrent, newCard, cards, currentCardId, isEditable]);

	const { mutate, error } = useMutation({
		mutationFn: ({api, value}) => {
			axios.post(`/api/patterns${api}`, value);
		},
		onError: error => console.log(error),
		onSuccess: e => {
			setIsEditable(false);
			setCurrentCardId(prev => prev === cards.length ? 0 : prev);
			navigate(`/lHood/patterns/${cards[0].value}`, {replace: true});
		}
	});

	const acceptSaving = async e => {
		const
		api = isNew ? '' : `/${data.id}`,
		value = isNew ? {cards} : cards;

		mutate({api, value});
	}
	const cancelSaving = e => {
		setCards([...data.cards]);
		setIsEditable(false);
		setCurrentCardId(prev => prev === cards.length ? 0 : prev);
	}

	const setTip = (calback) => {
		if (isNewCardCurrent)
			setNewCard(prev => ({
				...prev,
				tips: calback(prev?.tips || [])
			}));
		else
		setCards(prev => {
			prev[currentCardId].tips = calback(prev[currentCardId].tips || []);

			return [...prev];
		});
	}

	const getRidOfCard = id => {
		setCards(prev => prev.filter(card => card.id != id));
	}
	const getRidOfTip = (id) => {
		if (isNewCardCurrent) {
			setNewCard(prev => {
				const tips = prev.tips.filter(tip => tip.id != id);

				return { ...prev, tips };
			})
		}
		else setCards(prev => {
			prev[currentCardId].tips = prev[currentCardId].tips.filter(tip => tip.id != id);
			console.log(prev[currentCardId].tips)

			return [...prev]
		})
	}

	useEffect(e => {
		if (!Object.keys(newCard).length) {
			setNewCard(defaultCardValue);
			setNewTip({});

			if (cards.length)
				setCurrentCardId(prev => prev + 1);
		}
	}, [newCard]);

	return (
		<div id='fullSize' className={pattern}>
			<Tools
				isEditable={isEditable}
				setIsEditable={setIsEditable}
				cancelSaving={cancelSaving}
				acceptSaving={acceptSaving}
			/>

			<Image {...image} />
			
			<div>
				<div>
					<ScrollList
						type="card"
						items={cards}
						isMain={true}
						newItem={newCard}
						newChild={newTip}
						saveItem={setCards}
						isEditable={isEditable}
						setNewItem={setNewCard}
						removeItem={getRidOfCard}
						setCurrentId={setCurrentCardId}
					/>
				</div>
				<div>
					<ScrollList
						newItem={newTip}
						saveItem={setTip}
						setNewItem={setNewTip}
						isEditable={isEditable}
						removeItem={getRidOfTip}
						items={isNewCardCurrent ? newCard?.tips : cards[currentCardId]?.tips}
					/>
				</div>
			</div>
		</div>
	)
}

export default Pattern
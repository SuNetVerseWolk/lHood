import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pattern } from '../../styles/pattern.module.css'
import Image from '../../components/ui/Image'
import ScrollList from '../../layouts/ScrollList'
import Tools from './Tools'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import getDataAPI from '../../data/getDataAPI'
import loadingGif from '/loading.gif'
import LCard from '../../components/loading/LCard'
import Navbar from '../../layouts/Navbar'

const Pattern = () => {
	const navigate = useNavigate();
	const defaultCardValue = useMemo(e => JSON.parse(import.meta.env.VITE_DefaultCardValue), []);
	const { value } = useParams();
	const isNew = useMemo(e => value === import.meta.env.VITE_NEWDATAKEY, [value]);
	const [isEditable, setIsEditable] = useState(value === import.meta.env.VITE_NEWDATAKEY);
	const [cards, setCards] = useState([]);
	const { data, isLoading, isPending } = useQuery({
		queryKey: ['patterns', value],
		queryFn: e => getDataAPI(`patterns/${value}`),
		enabled: !isEditable || !isNew
	})
	const [currentCardId, setCurrentCardId] = useState(0);
	const isNewCardCurrent = useMemo(e => currentCardId === cards?.length, [currentCardId, cards]);
	const [newCard, setNewCard] = useState({});
	const [newTip, setNewTip] = useState({});

	//console.log('enabled', !isEditable || !isNew)
	//console.log(isLoading, isPending)
	//console.log(cards)

	const image = useMemo(e => {
		const
		src = isLoading ? loadingGif : isNewCardCurrent ? newCard?.img?.src : cards[currentCardId]?.img?.src;

		return {
			src,
			alt: 'Pattern Image',
			isEditable,
			currentCardId: currentCardId,
			setImage: (img) => {
				console.log(img)
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

	const makeCards = (cards) => {
		//console.log('make', cards, newTip, defaultCardValue)
		setCards(cards);
		setNewTip({});
		setNewCard({...defaultCardValue});
		setCurrentCardId(prev => prev + 1);
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

	//useEffect(e => {
	//	console.log(!Object.keys(newCard).length)
	//	if (!Object.keys(newCard).length) {
	//		setNewTip({});
	//		setNewCard({...defaultCardValue});
	//		console.log(newCard)

	//		if (cards.length)
	//			setCurrentCardId(prev => prev + 1);
	//	}
	//}, [newCard]);

	useEffect(e => setCards(data?.cards || []), [data]);
	//console.log('newCard', newCard)

	return (
		<div id='fullSize' className={pattern}>
			{!isLoading && (
				<Tools
					isEditable={isEditable}
					setIsEditable={setIsEditable}
					cancelSaving={cancelSaving}
					acceptSaving={acceptSaving}
				/>
			)}

			<Image {...image} />
			
			<div>
				<div>
					<ScrollList
						type="card"
						items={cards}
						isMain={true}
						newItem={newCard}
						newChild={newTip}
						saveItem={makeCards}
						isEditable={isEditable}
						setNewItem={setNewCard}
						removeItem={getRidOfCard}
						setCurrentId={setCurrentCardId}
						isLoading={isLoading}
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
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	)
}

export default Pattern
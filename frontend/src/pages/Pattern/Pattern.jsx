import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { pattern } from '../../styles/pattern.module.css'
import Image from '../../components/ui/Image'
import { userDefaultData } from '../../data/user'
import ScrollList from '../../layouts/ScrollList'
import Tools from './Tools'

const Pattern = () => {
	const defaultCardValue = useMemo(e => JSON.parse(import.meta.env.VITE_DefaultCardValue), []);
	const { param } = useParams();
	const [savedCards, setSavedCards] = useState(
		userDefaultData.patterns.find(pattern => pattern.cardsValues.includes(param))?.cards
		|| []
	);
	const [cards, setCards] = useState([...savedCards]);
	const [currentCardId, setCurrentCardId] = useState(0);
	const [isEditable, setIsEditable] = useState(param === import.meta.env.VITE_NEWDATAKEY);
	const isNewCardCurrent = useMemo(e => currentCardId === cards?.length, [currentCardId, cards]);
	const [newCard, setNewCard] = useState({});
	const [newTip, setNewTip] = useState({});

	const image = useMemo(e => {
		return {
			src: isNewCardCurrent ? newCard?.img : cards[currentCardId]?.img,
			alt: 'Pattern Image',
			isEditable,
			setImage: (file, img) => {
				if (isNewCardCurrent)
					setNewCard(prev => ({ ...prev, file, img }));
				else
				setCards(prev => {
					prev[currentCardId] = {...prev[currentCardId], file, img}
	
					return [...prev];
				});
			},
		}
	}, [isNewCardCurrent, newCard, cards, currentCardId, isEditable]);

	const ecceptSaving = e => {
		setSavedCards([...cards]);
		setIsEditable(false);
		setCurrentCardId(prev => prev === cards.length ? 0 : prev);
	}
	const cancelSaving = e => {
		setCards([...savedCards]);
		setIsEditable(false);
		setCurrentCardId(prev => prev === cards.length ? 0 : prev);
	}

	const setTip = (calback) => {
		if (isNewCardCurrent)
			setNewCard(prev => ({
				...prev,
				tips: calback(prev.tips || [])
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
				ecceptSaving={ecceptSaving}
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
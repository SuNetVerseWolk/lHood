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
	const isNewCardCurrent = useMemo(e => currentCardId === cards?.length, [currentCardId, cards]);
	const [isEditable, setIsEditable] = useState(param === import.meta.env.VITE_NEWDATAKEY);
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
	}
	const cancelSaving = e => {
		setCards([...savedCards]);
		setIsEditable(false);
	}

	const setTip = (calback) => {
		if (isNewCardCurrent) {
			setNewCard(prev => ({...prev, tips: [...(prev.tips || []), ...calback(prev.tips || [])]}));
			return prev;
		}

		setCards(prev => {
			prev[currentCardId].tips = calback(prev[currentCardId].tips);

			return [...prev];
		});
	}

	useEffect(e => {
		if (!Object.keys(newCard).length) {
			setNewCard(defaultCardValue)
			setCurrentCardId(prev => prev + 1)
		}
	}, [newCard]);

	useEffect(e => {
		console.log('saved', savedCards)
	}, [savedCards])
	useEffect(e => {
		console.log('data', cards)
	}, [cards])

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
						isMain={true}
						items={cards}
						newItem={newCard}
						setItems={setCards}
						isEditable={isEditable}
						setNewItem={setNewCard}
						setCurrentId={setCurrentCardId}
					/>
				</div>
				<div>
					<ScrollList
						newItem={newTip}
						setItems={setTip}
						setNewItem={setNewTip}
						isEditable={isEditable}
						items={isNewCardCurrent ? newCard?.tips : cards[currentCardId]?.tips}
					/>
				</div>
			</div>
		</div>
	)
}

export default Pattern

//const Pattern = ({userData}) => {
	//const types = ['noun', 'verb', 'adjective', 'phrase', 'idiom', 'expression', 'adverb'];

//	const imgLoader = useRef();
//	const mainCardContainer = useRef();
	//const { param } = useParams();
	//const [isEditable, setIsEditable] = useState(param === import.meta.env.VITE_NEWDATAKEY);
//	const [viewData, setViewData] = useState(param === import.meta.env.VITE_NEWDATAKEY ? [] : userData.data.rows.find(row => row.find(card => card.value === param)));
	//const [currentCardId, setCurrentCardId] = useState(0);
//	const [editableViewData, setEditableViewData] = useState(viewData);
//	const [newCard, setNewCard] = useState({});
//	const [newTipData, setNewTipData] = useState({});

//	const setFile = async e => {
//		const [file, img] = await getFileResult(e);

//		if (currentCardId === editableViewData.length) {
//			setNewCard(prev => ({ ...prev, file, img }));
//			return;
//		}
 
//		setEditableViewData(editableViewData => {
//			const data = [...editableViewData]
//			data[currentCardId] = {...data[currentCardId], file, img}

//			return data;
//		});
//	}
//	const getCurrentCardId = e => {
//		const container = mainCardContainer.current;
//		const cardWidth = container.querySelector('.card').offsetWidth;
//		let cardId = Math.round((container.scrollLeft + cardWidth) / cardWidth);
//		cardId = isEditable ? cardId - 2 : cardId - 1;
//		cardId = cardId < 0 ? editableViewData.length : cardId;

//		setCurrentCardId(cardId);
//	};

//	useEffect(e => {
//		const container = mainCardContainer.current;
//		container.addEventListener('scroll', getCurrentCardId);
//		imgLoader.current.addEventListener('change', setFile);

//		return e => {
//			container?.removeEventListener('scroll', getCurrentCardId);
//			imgLoader.current.removeEventListener('change', setFile);
//		}
//	}, [isEditable, currentCardId, editableViewData?.length]);

//	useEffect(e => {
//		console.log('ViewData', viewData);
//		console.log("Current's " + currentCardId + " => ", editableViewData[currentCardId]);
//		console.log('EditableData', editableViewData);
//		console.log('ViewData', viewData);
//		console.log('NewCard', newCard);
//	}, [currentCardId, isEditable, editableViewData, newCard]);

//	const ecceptEdited = e => {
//		setViewData(editableViewData);
//		setIsEditable(false);
//	}
//	const cancelEdited = e => {
//		setEditableViewData(viewData);
//		setIsEditable(false);
//	}
//	const makeMain = e => {
//		setEditableViewData(editableViewData => {
//			const upData = [...editableViewData];
//			upData[upData.length] = {id: crypto.randomUUID(), ...newCard};

//			setNewCard({});
//			setCurrentCardId(upData.length);

//			return upData;
//		})
//	}
//	const make = e => {
//		setViewData(viewData => {
//			const upData = [...viewData];
//			if (currentCardId ) {
				
//			}
//			upData.tips[viewData.length] = newTipData;
//			setNewCard({});
//			//getCurrentCardId(0);
//			//console.count('makeMain', upData);

//			return upData;
//		});
//	}

//	const img = currentCardId === editableViewData.length ? newCard?.img : editableViewData[currentCardId]?.img;

//	console.log(style)
//	return (
//		<div id={style.pattern}>
//			<div id={style.edit}>
//				{isEditable ? (
//					<>
//						<motion.div
//							initial={{scale: .5}}
//							animate={{scale: 1}}
//							whileTap={{scale: .97}}
//						>
//							<CancelSvg
//								id={style.cancelSvg}
//								onClick={cancelEdited}
//							/>
//						</motion.div>

//						<motion.div
//							initial={{scale: .5}}
//							animate={{scale: 1}}
//							whileTap={{scale: .97}}
//						>
//							<AcceptSvg onClick={ecceptEdited} />
//						</motion.div>
//					</>
//				) : (
//					<motion.div
//						animate={{scale: 1}}
//						initial={{scale: .5}}
//						whileTap={{scale: .97}}
//					>
//						<EditSvg onClick={e => setIsEditable(true)} />
//					</motion.div>
//				)}

//				<input
//					ref={imgLoader}
//					type='file'
//					id={style.imgLoader}
//					name='imgLoader'
//				/>
//			</div>

//			<img
//				src={img}
//				onClick={e => isEditable && imgLoader.current.click()}
//			/>

//			<div>
//				<div id={style.learn} className={style.navContainer}>
//					<Navbar innerRef={mainCardContainer}>
//						{isEditable && (
//							<Card
//								index={editableViewData.length}
//								key={editableViewData.length}
//								types={types}
//								levels={levels}
//								make={makeMain}
//								isEditable={isEditable}
//								setViewData={setViewData}
//								setNewCard={setNewCard}
//								setEditableData={setEditableViewData}
//							/>
//						)}
//						{
//							editableViewData.map((value, i) => {
//								return (
//									<Card
//										index={i}
//										key={value.id}
//										data={value}
//										types={types}
//										levels={levels}
//										isEditable={isEditable}
//										setEditableData={setEditableViewData}
//									/>
//								)
//							})
//						}
//					</Navbar>
//				</div>
//				{
//					(editableViewData[currentCardId]?.tips?.length || isEditable) &&

//					<div id={style.tips} className={style.navContainer}>
//						<h2>Pro Tips</h2>
//						<Navbar>
//							{
//								isEditable &&
//								<Card
//									index={editableViewData[currentCardId]?.tips.length || 0}
//									key={editableViewData[currentCardId]?.tips.length || 0}
//									isEditable={isEditable}
//									setEditableData={setEditableViewData}
//								/>
//							}
//							{
//								editableViewData[currentCardId]?.tips.map((tip, i) => {
//									return (
//										<Card
//											index={i}
//											key={tip.id}
//											data={tip}
//											isEditable={isEditable}
//											setEditableData={setEditableViewData}
//										/>
//									)
//								})
//							}
//						</Navbar>
//					</div>
//				}
//			</div>
//			<div id='X'>
//				<h2>Compare with</h2>
//				<Navbar justifyContent={'space-evenly'}>
//					<span>Word</span> <span>Word</span> <span>Word</span>
//				</Navbar>
//				<p id='description' contentEditable={isEditable}>Description</p>
//			</div>
//		</div>
//	)
//}

//export default Pattern
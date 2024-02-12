import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../layouts/Navbar'
import Card from '../layouts/Card'
import getFileResult from '../utils/getFileResult'
import EditSvg from '../assets/edit.svg?react'
import AcceptSvg from '../assets/accept.svg?react'
import CancelSvg from '../assets/cross.svg?react'

const Subject = ({userData}) => {
	const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
	const types = ['noun', 'verb', 'adjective', 'phrase', 'idiom', 'expression', 'adverb'];

	const imgLoader = useRef();
	const mainCardContainer = useRef();
	const { param } = useParams();
	const [isEditable, setIsEditable] = useState(param === import.meta.env.VITE_NEWDATAKEY);
	const [viewData, setViewData] = useState(param === import.meta.env.VITE_NEWDATAKEY ? [] : userData.data.rows.find(row => row.find(card => card.value === param)));
	const [currentCardId, setCurrentCardId] = useState(0);
	const [editableViewData, setEditableViewData] = useState(viewData);
	const [newCardData, setNewCardData] = useState({});
	const [newTipData, setNewTipData] = useState({});

	const setFile = async e => {
		const [file, img] = await getFileResult(e);

		if (currentCardId === editableViewData.length) {
			setNewCardData(prev => ({ ...prev, file, img }));
			return;
		}
 
		setEditableViewData(editableViewData => {
			const data = [...editableViewData]
			data[currentCardId] = {...data[currentCardId], file, img}

			return data;
		});
	}
	const getCurrentCardId = e => {
		const container = mainCardContainer.current;
		const cardWidth = container.querySelector('.card').offsetWidth;
		let cardId = Math.round((container.scrollLeft + cardWidth) / cardWidth);
		cardId = isEditable ? cardId - 2 : cardId - 1;
		cardId = cardId < 0 ? editableViewData.length : cardId;

		setCurrentCardId(cardId);
	};

	useEffect(e => {
		const container = mainCardContainer.current;
		container.addEventListener('scroll', getCurrentCardId);
		imgLoader.current.addEventListener('change', setFile);

		return e => {
			container?.removeEventListener('scroll', getCurrentCardId);
			imgLoader.current.removeEventListener('change', setFile);
		}
	}, [isEditable, currentCardId, editableViewData?.length]);

	useEffect(e => {
		console.log('ViewData', viewData);
		console.log("Current's " + currentCardId + " => ", editableViewData[currentCardId]);
		console.log('EditableData', editableViewData);
		console.log('ViewData', viewData);
		console.log('NewCardData', newCardData);
	}, [currentCardId, isEditable, editableViewData, newCardData]);

	const ecceptEdited = e => {
		setViewData(editableViewData);
		setIsEditable(false);
	}
	const cancelEdited = e => {
		setEditableViewData(viewData);
		setIsEditable(false);
	}
	const makeMain = e => {
		setEditableViewData(editableViewData => {
			const upData = [...editableViewData];
			upData[upData.length] = {id: crypto.randomUUID(), ...newCardData};

			setNewCardData({});
			setCurrentCardId(upData.length);

			return upData;
		})
	}
	const make = e => {
		setViewData(viewData => {
			const upData = [...viewData];
			if (currentCardId ) {
				
			}
			upData.tips[viewData.length] = newTipData;
			setNewCardData({});
			//getCurrentCardId(0);
			//console.count('makeMain', upData);

			return upData;
		});
	}

	const img = currentCardId === editableViewData.length ? newCardData?.img : editableViewData[currentCardId]?.img;

	return (
		<div id='subject'>
			<div id='edit'>
				{isEditable ?
					<>
						<motion.div animate={{scale: 1}} initial={{scale: .5}} whileTap={{scale: .97}}><CancelSvg id="cancelSvg" onClick={cancelEdited} /></motion.div>
						<motion.div animate={{scale: 1}} initial={{scale: .5}} whileTap={{scale: .97}}><AcceptSvg onClick={ecceptEdited} /></motion.div>
					</>
					: <motion.div animate={{scale: 1}} initial={{scale: .5}} whileTap={{scale: .97}}><EditSvg onClick={e => setIsEditable(true)} /></motion.div>}
			</div>
			<img
				src={img}
				onClick={e => isEditable && imgLoader.current.click()}
			/>
			<input ref={imgLoader} type="file" name="imgLoader" id="imgLoader" />
			<div className='container'>
				<div id='learn' className="navContainer">
					<Navbar link={mainCardContainer}>
						{
							isEditable &&
							<Card
								id={editableViewData.length}
								key={editableViewData.length}
								make={makeMain}
								types={types}
								levels={levels}
								isEditable={isEditable}
								setViewData={setViewData}
								setNewCardData={setNewCardData}
								setEditableData={setEditableViewData}
							/>
						}
						{
							editableViewData.map((value, i) => {
								return (
									<Card
										index={i}
										key={value.id}
										data={value}
										types={types}
										levels={levels}
										isEditable={isEditable}
										setCurrentCardId={currentCardId}
										setEditableData={setEditableViewData}
									/>
								)
							})
						}
					</Navbar>
				</div>
				{
					editableViewData[currentCardId]?.tips?.length &&
					<div id='tips' className='navContainer'>
						<h2>Pro Tips</h2>
						<Navbar>
							{isEditable && <Card isEditable={isEditable} />}
							{
								editableViewData[currentCardId]?.tips.map(tip => {
									return (
										<Card data={tip} isEditable={isEditable} key={tip.value} />
									)
								})
							}
						</Navbar>
					</div>
				}
			</div>
			<div id='X'>
				<h2>Compare with</h2>
				<Navbar justifyContent={'space-evenly'}>
					<span>Word</span> <span>Word</span> <span>Word</span>
				</Navbar>
				<p id='description' contentEditable={isEditable}>Description</p>
			</div>
		</div>
	)
}

export default Subject
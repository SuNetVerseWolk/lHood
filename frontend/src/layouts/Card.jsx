import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import RightArrowSvg from '../assets/rightArrow.svg?react';
import ClearTSvg from "../assets/clearText.svg?react";
import CrossSvg from '../assets/cross.svg?react';

const Card = ({index, isEditable, make, levels, types, data = JSON.parse(import.meta.env.VITE_DefaultCardValue), setEditableData, setNewCardData}) => {
	const [viewCardData, setViewCardData] = useState(data);
	const isNew = !Object.keys(data).includes('value', 'IPA');

	const inputViewCardData = e => {
		const el = e.target;

		if (el.localName === 'textarea') {
			el.style.height = 'auto';
			el.style.height = `${el.scrollHeight}px`;
		}

		setViewCardData(viewCardData => ({...viewCardData, [el.id]: el.value}));
	}

	const create = e => {
		make();
		setViewCardData(JSON.parse(import.meta.env.VITE_DefaultCardValue));
	}

	const remove = e => {
		setEditableData(editableViewData => {
			const upData = editableViewData.filter((data, i) => i != index);
			console.log(upData);
			return upData;
		});
	}

	useEffect(e => {
		if (isNew && setNewCardData) {
			setNewCardData(newCardData => ({...newCardData, ...viewCardData}));
			return;
		}
		setEditableData && setEditableData(editableData => {
			const upData = [...editableData];
			upData[index] = {...upData[index], ...viewCardData};

			return upData;
		});
	}, [viewCardData]);

	const clearAllText = e => {
		setViewCardData(viewCardData => ({...viewCardData, value: '', IPA: '', description: '', example: '', ...JSON.parse(import.meta.env.VITE_DefaultCardValue)}));
	}

	return (
		<motion.div className="card" initial={{scale: .8}} animate={{scale: 1}}>
			{
				isNew ?
				<>
					<div className='ridBtn'><ClearTSvg onClick={clearAllText} /></div>
					<div id="rightArrow" onClick={create}><RightArrowSvg /></div>
				</>
				: isEditable && <div id="cross" className='ridBtn' onClick={remove}><CrossSvg /></div>
			}
			{
				levels &&
				<select name="level" id="level" disabled={!isEditable} defaultValue={viewCardData?.level} onChange={inputViewCardData}>
					{levels.map(level => {
						return <option key={level}>{level}</option>;
					})}
				</select>
			}
			<input
				id="value"
				type="text"
				name="value"
				placeholder='Value'
				disabled={!isEditable}
				value={viewCardData.value || ''}
				onInput={inputViewCardData}
			/>
			{
				types &&
				<>
					<div id='value'>
						<input
							id="IPA"
							name="IPA"
							type="text"
							disabled={!isEditable}
							placeholder='transcription'
							value={viewCardData.IPA || ''}
							onInput={inputViewCardData}
						/>
						<select name="type" id="type" disabled={!isEditable} defaultValue={viewCardData?.type} onChange={inputViewCardData}>
							{types.map(type => {
								return <option key={type}>{type}</option>;
							})}
						</select>
					</div>
					<hr />
				</>
			}
			<textarea
				id="description"
				disabled={!isEditable}
				onInput={inputViewCardData}
				placeholder='Write a description...'
			>
				{viewCardData?.description}
			</textarea>
			<textarea
				id="example"
				disabled={!isEditable}
				onInput={inputViewCardData}
				placeholder='Write an example...'
			>
				{viewCardData?.example}
			</textarea>
		</motion.div>
	)
}

export default Card
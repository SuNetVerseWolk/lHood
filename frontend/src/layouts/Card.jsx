import React, { useState } from 'react';
import selectAllText from '../events/selectAllText';
import RightArrow from '../assets/rightArrow.svg?react';

const Card = ({isEditing, levels, types, data, setViewData}) => {
	const defaultData = {level: 'A1', type: 'noun'};
	const defaultDescription = 'Write a description...';
	const defaultExample = 'Write an example...';
	const essentialKeys = ['value', 'IPA', 'description', 'example'];
	
	data = data ? data : defaultData;
	const [viewCardData, setViewCardData] = useState(data);
	const isNew = !Object.keys(data).includes(...essentialKeys);

	const make = e => setViewData(current => {
		let values = current?.values || [];
		values.push({...viewCardData});

		setViewCardData(defaultData);

		return {...current, values: values};
	});
	const setViewCardDataByValue = e => setViewCardData({...viewCardData, [e.target.id]: e.target.value});
	const setViewCardDataByTextContent = e => setViewCardData({...viewCardData, [e.target.id]: e.target.textContent});

	return (
		<div className="card">
			{
				isNew &&
				<div id="rightArrow" onClick={make}><RightArrow /></div>
			}
			{
				levels &&
				<select name="level" id="level" disabled={!isEditing} defaultValue={viewCardData?.level} onChange={setViewCardDataByValue}>
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
				disabled={!isEditing}
				value={viewCardData.value || ''}
				onInput={setViewCardDataByValue}
			/>
			{
				types &&
				<>
					<div id='value'>
						<input
							id="IPA"
							name="IPA"
							type="text"
							placeholder='transcription'
							value={viewCardData.IPA || ''}
							onInput={setViewCardDataByValue}
						/>
						<select name="type" id="type" disabled={!isEditing} defaultValue={viewCardData?.type} onChange={setViewCardDataByValue}>
							{types.map(type => {
								return <option key={type}>{type}</option>;
							})}
						</select>
					</div>
					<hr />
				</>
			}
			<p
				id='description'
				contentEditable={isEditing}
				onClick={e => selectAllText(e, defaultDescription)}
				onBlur={setViewCardDataByTextContent}
			>
				{viewCardData?.description || defaultDescription}
			</p>
			<p
				id='example'
				contentEditable={isEditing}
				onClick={e => selectAllText(e, defaultExample)}
				onBlur={setViewCardDataByTextContent}
			>
				{viewCardData?.example || defaultExample}
			</p>
		</div>
	)
}

export default Card
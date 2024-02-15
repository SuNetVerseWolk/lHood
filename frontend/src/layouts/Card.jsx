import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion'
import RightArrowSvg from '../assets/rightArrow.svg?react';
import ClearTSvg from "../assets/clearText.svg?react";
import CrossSvg from '../assets/cross.svg?react';
import styles from '../styles/pattern.module.css';

const Card = ({
	data,
	index,
	setData,
	ridData,
	isEditable,
	saveNewData,
	isMain
}) => {
	const levels = useMemo(e => JSON.parse(import.meta.env.VITE_CardLevels), []);
	const types = useMemo(e => JSON.parse(import.meta.env.VITE_CardTypeOfValue), []);

	const changeData = e => {
		const el = e.target;

		if (el.localName === 'textarea') {
			el.style.height = 'auto';
			el.style.height = `${el.scrollHeight}px`;
		}

		setData(prev => {
			if (!saveNewData) {
				prev[index] = {...prev[index], [el.name]: el.value};

				return [...prev];
			}

			return { ...prev, [el.name]: el.value };
		});
	}

	const handleRightArrow = e => {
		saveNewData(prev => {
			prev[index] = {...data, id: crypto.randomUUID()};
			console.log(prev)
			setData({});

			return [...prev];
		})
	}

	return (
		<motion.div
			className={styles.card}
			initial={{scale: .8}}
			animate={{scale: 1}}
		>
			{!!saveNewData ? (
				<>
					<div className={styles.ridBtn}>
						<ClearTSvg />
					</div>
					<div id={styles.rightArrow} onClick={handleRightArrow}>
						<RightArrowSvg />
					</div>
				</>
			) : isEditable && (
				<div id={styles.cross} className={styles.ridBtn} onClick={ridData}>
					<CrossSvg />
				</div>
			)}

			{isMain && (
				<select
					name="level"
					id={styles.level}
					disabled={!isEditable}
					defaultValue={data?.level}
					onChange={changeData}
				>
					{levels.map(level => (
						<option key={level}>
							{level}
						</option>
					))}
				</select>
			)}

			<input
				id={styles.value}
				type="text"
				name="value"
				placeholder="Value"
				disabled={!isEditable}
				value={data?.value || ''}
				onInput={changeData}
			/>

			{isMain && (
				<>
					<div id={styles.value}>
						<input
							id={styles.IPA}
							name='IPA'
							type='text'
							disabled={!isEditable}
							placeholder='transcription'
							value={data?.IPA || ''}
							onInput={changeData}
						/>
						<select
							name='type'
							id={styles.type}
							disabled={!isEditable}
							defaultValue={data?.type}
							onChange={changeData}
						>
							{types.map(type => (
								<option key={type}>
									{type}
								</option>
							))}
						</select>
					</div>
					<hr />
				</>
			)}

			<textarea
				name='description'
				id={styles.description}
				value={data?.description}
				disabled={!isEditable}
				placeholder='Write a description...'
				onInput={changeData}
			/>

			<textarea
				name='example'
				id={styles.example}
				value={data?.example}
				disabled={!isEditable}
				placeholder='Write an example...'
				onInput={changeData}
			/>
		</motion.div>
	)
}

export default Card
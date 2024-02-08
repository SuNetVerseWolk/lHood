import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../layouts/Navbar'
import { useParams } from 'react-router-dom'
import EditSvg from '../assets/edit.svg?react'
import AcceptSvg from '../assets/accept.svg?react'
import Card from '../layouts/Card'
import { motion } from 'framer-motion'

const Subject = ({userData}) => {
	const { param } = useParams();
	const [isEditing, setIsEditing] = useState(param === 'new');
	const imgLoader = useRef();
	const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
	const types = ['noun', 'verb', 'adjective', 'phrase', 'idiom', 'expression', 'adverb'];
	const [viewData, setViewData] = useState(param === 'new' ? {} : userData.data.local[param]);

	useEffect(e => {
		const addFile = e => {
			const fileReader = new FileReader();
			const file = e.target.files[0];

			fileReader.readAsDataURL(file);
			fileReader.onload = function() {
				setViewData({img: fileReader.result})
			}
		};

		imgLoader.current.addEventListener('change', e => addFile(e));
		return imgLoader.current.removeEventListener('change', e => addFile(e));
	}, []);

	useEffect(e => {
		console.log(viewData);
	}, [viewData]);

	return (
		<div id='subject'>
			<motion.div id='edit' animate={{scale: 1}} initial={{scale: .5}} whileTap={{scale: .97}}>
				{isEditing ? <AcceptSvg onClick={e => setIsEditing(false)} /> : <EditSvg onClick={e => setIsEditing(true)} />}
			</motion.div>
			<img
				src={viewData?.img}
				onClick={e => isEditing && imgLoader.current.click()}
			/>
			<input ref={imgLoader} type="file" name="imgLoader" id="imgLoader" />
			<div className='container'>
				<div id='learn' className="navContainer">
					<Navbar>
						{isEditing &&
							<Card
								types={types}
								levels={levels}
								isEditing={isEditing}
								setViewData={setViewData}
							/>
						}
						{
							viewData?.values?.map(value => {
								return (
									<Card
										types={types}
										levels={levels}
										isEditing={isEditing}
										setViewData={setViewData}
										data={value}
										key={value.value}
									/>
								)
							})
						}
					</Navbar>
				</div>
				{
					isEditing &&
					<div id='tips' className='navContainer'>
						<h2>Pro Tips</h2>
						<Navbar>
							{isEditing && <Card isEditing={isEditing} />}
						</Navbar>
					</div>
				}
			</div>
			<div id='X'>
				<h2>Compare with</h2>
				<Navbar justifyContent={'space-evenly'}>
					<span>Word</span> <span>Word</span> <span>Word</span>
				</Navbar>
				<p id='description' contentEditable={isEditing}>Description</p>
			</div>
		</div>
	)
}

export default Subject
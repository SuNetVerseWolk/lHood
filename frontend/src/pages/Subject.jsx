import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../layouts/Navbar'
import Item from '../components/Item'
import { useParams } from 'react-router-dom'
import EditSvg from '../assets/edit.svg?react'
import AcceptSvg from '../assets/accept.svg?react'

const Subject = () => {
	const { param } = useParams();
	const [data, setData] = useState({});
	const [isEditMode, setIsEditMode] = useState(param === 'subject' ? true : false);
	const imgLoader = useRef();
	const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
	const types = ['noun', 'verb', 'adjective', 'phrase', 'idiom', 'expression', 'adverb'];

	useEffect(e => {
		const addFile = e => {
			const fileReader = new FileReader();
			const file = e.target.files[0];

			fileReader.readAsDataURL(file);
			fileReader.onload = function() {
				setData({img: fileReader.result})
			}
		};

		imgLoader.current.addEventListener('change', e => addFile(e));
		return imgLoader.current.removeEventListener('change', e => addFile(e));
	}, []);

	return (
		<div id='subject'>
			{isEditMode ? <AcceptSvg onClick={e => setIsEditMode(false)} /> : <EditSvg onClick={e => setIsEditMode(true)} />}
			<img
				src={data?.img}
				onClick={e => isEditMode && imgLoader.current.click()}
			/>
			<input ref={imgLoader} type="file" name="imgLoader" id="imgLoader" />
			<div className='container'>
				<div id='learn' className="navContainer">
					<Navbar>
						<div className="card" id='make'>
							<input type="text" name="header" id="header" placeholder='Word' disabled={!isEditMode} />
							<div id='value'>
								<span id='IPA'>/ wɜrd /</span>
								<select name="level" id="level" disabled={!isEditMode}>
									{levels.map(level => {
										return <option key={level}>{level}</option>;
									})}
								</select>
								<select name="type" id="type" disabled={!isEditMode}>
									{types.map(type => {
										return <option key={type}>{type}</option>;
									})}
								</select>
							</div>
							<hr />
							<p id='description' contentEditable={isEditMode}>Description</p>
							<p id='example' contentEditable={isEditMode}>Example</p>
						</div>
					</Navbar>
				</div>
				<div id='tips' className='navContainer'>
					<h2>Pro Tips</h2>
					<Navbar>
						<div className="card">
							<input type="text" name="header" id="header" placeholder='Word' disabled={!isEditMode} />
							<p id='description' contentEditable={isEditMode}>Description</p>
							<p id='example' contentEditable={isEditMode}>Example</p>
						</div>
					</Navbar>
				</div>
			</div>
			<div id='X'>
				<h2>Compare with</h2>
				<Navbar justifyContent={'space-evenly'}>
					<span>Word</span> <span>Word</span> <span>Word</span>
				</Navbar>
				<p id='description' contentEditable={isEditMode}>Description</p>
			</div>
		</div>
	)
}

export default Subject
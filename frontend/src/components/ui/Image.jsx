import React from 'react'
import getFileResult from '../../utils/getFileResult';

const Image = ({ src, alt, setImage }) => {
	const handleImage = async e => {
		try {
			const fileInputEl = document.createElement('input')
			fileInputEl.type = 'file'
			fileInputEl.onchange = async e =>
				setImage(await getFileResult(e.target.files[0]))

			fileInputEl.click()

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<img
				src={src}
				alt={alt || 'img'}
				onClick={handleImage}
			/>
		</>
	)
}

export default Image
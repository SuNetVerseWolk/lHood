import React, { useMemo } from 'react'
import getFileResult from '../../utils/getFileResult';
import addImageSrc from '/addImage.gif';
import noImageSrc from '/noImage.webp';
export { fonImage } from '../../styles/fonImage.module.css'

const Image = ({ src, style, alt, setImage, isEditable }) => {
	const resrc = useMemo(e => isEditable ? addImageSrc : noImageSrc, [isEditable, src])
	const handleImage = async e => {
		if (!isEditable) return;

		try {
			const fileInputEl = document.createElement('input')
			fileInputEl.type = 'file'
			fileInputEl.onchange = async e => {
				setImage(await getFileResult(e.target.files[0]))
			}

			fileInputEl.click()

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<img
				className={style}
				src={src || resrc}
				alt={alt || 'img'}
				onClick={handleImage}
				onError={(e) => e.target.src = resrc}
			/>
		</>
	)
}

export default Image
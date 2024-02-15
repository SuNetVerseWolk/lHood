import React, { useRef } from 'react'
import getFileResult from '../../utils/getFileResult';

const Image = ({ src, alt, setImage, style, isEditable }) => {
	const imgUploader = useRef();

	const handleImageUpload = e => {
		if (isEditable) imgUploader.current?.click();
	}

	const imgUploaderChange = async e => {
		console.log(1)
		const result = await getFileResult(e);

		setImage(...result)
	}

	return (
		<>
			<img
				src={src}
				alt={alt || 'img'}
				onClick={handleImageUpload}
				style={style}
			/>
			<input
				ref={imgUploader}
				type='file'
				accept="image/*"
				onChange={imgUploaderChange}
				style={{display: 'none'}}
			/>
		</>
	)
}

export default Image
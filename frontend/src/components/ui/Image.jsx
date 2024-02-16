import React, { useRef } from 'react'
import getFileResult from '../../utils/getFileResult';

const Image = ({ src, alt, setImage, style, isEditable }) => {
	const imgUploader = useRef();

	const handleImageUpload = e => {
		if (isEditable) imgUploader.current?.click();
	}

	const imgUploaderChange = async e => {
		const result = await getFileResult(e);
		e.target.value = '';

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
				onInput={imgUploaderChange}
				style={{display: 'none'}}
			/>
		</>
	)
}

export default Image
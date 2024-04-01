const getFileResult = (file) => {
	const fileReader = new FileReader();

	fileReader.readAsDataURL(file);
	return new Promise((resolve) => {
		fileReader.onload = (e) => resolve({
			data: fileReader.result,
			src: fileReader.result,
			extname: file.name.split('.').pop(),
		});
	}).then(r => r);
}

export default getFileResult;
const getFileResult = (file) => {
	const fileReader = new FileReader();

	fileReader.readAsDataURL(file);
	return new Promise((resolve) => {
		fileReader.onload = (e) => resolve(fileReader.result);
	}).then(r => r);
}

export default getFileResult;
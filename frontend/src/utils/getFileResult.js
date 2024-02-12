const getFileResult = (e) => {
	const fileReader = new FileReader();
	const file = e.target.files[0];

	fileReader.readAsDataURL(file);
	return new Promise((resolve) => {
		fileReader.onload = (e) => resolve([file, fileReader.result]);
	}).then(r => r);
}

export default getFileResult;
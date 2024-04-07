const getFileResult = (file) => {
	const fileReader = new FileReader();

	fileReader.readAsDataURL(file);
	return new Promise((resolve) => {
		fileReader.onload = (e) => {
			if (file.name.includes('.')) {
				resolve({
					data: fileReader.result,
					src: fileReader.result,
					extname: file.name.split('.').pop(),
				});
			}
			else console.error(file.name)
		}
	}).then(r => r);
}

export default getFileResult;
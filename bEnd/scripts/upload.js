const
fs = require('fs'),
path = require('path');

const upload = (fileName, data) => {
	const filePath = path.join(__dirname, '../data/uploads/', fileName);

	data = data.replace(/^data:[a-z]*\/[a-z]*;base64,/g, "");
	data = data.replace(/ /g, '+');

	fs.writeFileSync(filePath, data, {encoding: 'base64'});
}

module.exports = upload
const
	fs = require('fs'),
	path = require('path')

const setData = (filePath, data) => {
	fs.writeFileSync(
		path.join(__dirname, 'data', filePath + '.json'),
		JSON.stringify(data),
		{encoding: 'utf8'}
	);
}

module.exports = setData
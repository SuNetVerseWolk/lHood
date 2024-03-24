const getNewItem = (req, res) => {
	const newItem = req.body;

	if (!Object.keys(newItem).length) {
		res.status(100)
		return;
	}

	newItem.id = new Date().getTime().toString();
	return newItem;
};

module.exports = getNewItem;
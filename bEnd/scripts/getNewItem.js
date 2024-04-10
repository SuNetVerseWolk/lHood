const upload = require("./upload");

const getNewItem = (req, res) => {
	const newItem = req.body;

	if (!newItem?.cards?.length)
		return res.status(100).json(false);
	
	newItem.id = Date.now();

	newItem.cards.forEach(card => {
		card.id = Date.now();

		const
		imgData = card.img.data,
		imgName = `${card.id}.${card.img.extname}`;

		card.img = { src: `/api/${imgName}` };
		upload(imgName, imgData);
		
		card?.items?.forEach(item => item.id = Date.now());
	})

	return newItem;
};

module.exports = getNewItem;
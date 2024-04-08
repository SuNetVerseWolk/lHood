const
	port = process.env.PORT || 3001,
	express = require('express'),
	cors = require('cors'),
	app = express(),
	dataPaths = ['communities', 'patterns', 'people'],
	{ setData, getData, getNewItem, getFilteredData } = require('./getScripts');

app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./data/uploads/'));


dataPaths.forEach(dataPath => {
	app.get(`/${dataPath}`, (req, res) => {
		const
		filter = req.query?.filter,
		data = getData(dataPath);
		console.log(filter)

		res.json(getFilteredData(data, filter, dataPath))
	});

	app.post(`/${dataPath}`, (req, res) => {
		const
		newItem = getNewItem(req, res),
		data = getData(dataPath);

		data.push(newItem);

		if (!setData(dataPath, data)) {
			res.status(500).send(false);
			return;
		};

		res.json(newItem.id);
	});

	app.delete(`/${dataPath}/:id`, (req, res) => {
		const
			itemId = +req.params.id,
			data = getData(dataPath);

		for (var i = 0; i < data.length; i++) {
			if (itemId === data[i].id) {
				data.splice(i, 1);
				break;
			}
		}

		setData(dataPath, data);
		res.json(true);
	})
});


app.get(`/patterns/:value`, (req, res) => {
	let data = getData('patterns');

	data = data.find(pattern =>
		pattern?.cards.some(card =>
			card.value === req.params.value
		)
	);

	res.json(data);
});

app.post('/patterns/:id', (req, res) => {
	const
	data = getData('patterns'),
	pattern = data.find(pattern => pattern.id === +req.params.id);

	if (!pattern) return res.status(404).json(false);
	pattern.cards = req.body;

	setData('patterns', data);
	res.json(true);
})


app.listen(port, e => console.log(`DB keeps on ${port}`));
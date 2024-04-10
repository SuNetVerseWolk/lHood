const
	port = process.env.PORT || 3001,
	express = require('express'),
	cors = require('cors'),
	app = express(),
	dataPaths = ['communities', 'patterns', 'people'],
	{ setData, getData, getNewItem, getFilteredData } = require('./getScripts');

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./data/uploads/'));

const defaultUserData = {
	name: 'noName',
	avatar: null,
	communities: [],
	friends: [],
	patterns: []
};


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

		if (newItem) {
			data.push(newItem);

			if (setData(dataPath, data)) return res.json(newItem.id);
		}

		res.status(500).json(false);
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


app.get('/patterns/:value', (req, res) => {
	let data = getData('patterns');

	data = data.find(pattern =>
		pattern?.cards.some(card =>
			card.value === req.params.value
		)
	);

	res.json(data);
});

app.get('/person/:id', (req, res) => {
	const
		people = getData('people'),
		person = people.find(p => p.id === +req.params.id),
		{name, avatar, communities, friends, patterns} = person;

	console.log(req.params.id)
	if (person) return res.json({name, avatar, communities, friends, patterns})

	res.status(404).json(false);
})


app.post('/patterns/:id', (req, res) => {
	const
		patterns = getData('patterns'),
		pattern = patterns.find(pattern => pattern.id === +req.params.id);

	if (!pattern) return res.status(404).json(false);
	pattern.cards = req.body;

	setData('patterns', patterns);
	res.json(true);
})

app.post('/sign/:signType', (req, res) => {
	let people = getData('people');

	switch (req.params.signType) {
		case 'in':
			const person = people.find(p => p.email === req.body.email);

			if (person) {
				const { id, password } = person;

				if (password === req.body.password)
					return res.json({ id });

				res.status(403).json(false);
			}
			else res.status(404).json(false);

			break;
		case 'up':
			const
				id = Date.now(),
				newUserData = { id, ...req.body, ...defaultUserData };

			people.push(newUserData);
			setData('people', people);
			res.json({ id });
			break;

		default:
			res.status(500).json(false);
			break;
	}
})


app.listen(port, e => console.log(`DB keeps on ${port}`));
const getFilteredData = (data, filter, type) => {
	const filteredData = [];

	if (filter) {
		console.log(filter)
		switch (type) {
			case "patterns":
				data.forEach(pattern =>
					filteredData.push(...pattern.cards.filter(card =>
						card.state === filter
					).map(card => ({
						id: card.id,
						value: card.value,
						img: card.img
					}))
				));
				break;
		
			default:
				break;
		}
	}
	else {
		switch (type) {
			case "patterns":
				data.forEach(pattern =>
					filteredData.push(
						...pattern?.cards.map(card =>
							({
								id: card?.id,
								value: card?.value,
								img: card?.img
							})
				)));
				break;
			case "people":
				data.forEach(person =>
					filteredData.push(({
						id: person.id,
						value: person.name,
						img: person.avatar
					})))
		
			default:
				break;
		}
	}

	return filteredData;
};

module.exports = getFilteredData;
import axios from "axios";

const getDataAPI = async (url, filter = '') => {
	filter = filter === 'all' ? '' : filter;
	url = `/api/${url}?filter=${filter}`;

	const { data } = await axios.get(url);
	return data;
}

export default getDataAPI;
import axios from 'axios';

const getAllGenre = async () => {

	let res = await axios.get(
		'/api/get_data/all_genre'
		)
	.then ((response) => {
		return (response)
	})
	.catch((error) => {
		return (error.response);
	})
	return res;
}

export default {
	getAllGenre,
}
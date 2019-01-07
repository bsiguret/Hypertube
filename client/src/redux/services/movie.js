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

const initMovies = async () => {

	let res = await axios.get(
		'/api/get_data/all_movies'
		)
	.then ((response) => {
		return (response)
	})
	.catch((error) => {
		return (error.response);
	})
	return res;
}

const getMovies = async (min_rating, max_rating, min_year, max_year, genres, order, nb) => {
	console.log(min_rating, max_rating, min_year, max_year, genres, order, nb)
	let res = await axios.post(`/api/get_data/all_movies/${nb}`, {
		min_rating,
		max_rating,
		min_year,
		max_year,
		genres,
		order
	})
	.then ((response) => {
		return (response)
	})
	.catch((error) => {
		console.log(error.response)
		return (error.response);
	})
	return res;
}

export default {
	getAllGenre,
	initMovies,
	getMovies
}
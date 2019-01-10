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

const getMovieInfo = async (movie_id) => {
	console.log(movie_id)
	let res = await axios.get(
		`/api/get_data/movie/${movie_id}`
		)
	.then ((response) => {
		return (response)
	})
	.catch((error) => {
		return (error.response);
	})
	return res;
}

const getMovies = async (name, min_rating, max_rating, min_year, max_year, genres, order, nb) => {
	console.log(name, min_rating, max_rating, min_year, max_year, genres, order, nb)
	let res = await axios.post(`/api/get_data/all_movies/${nb}`, {
		name,
		min_rating,
		max_rating,
		min_year,
		max_year,
		genres,
		order
	})
	.then ((response) => {
		console.log(response)
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
	getMovies,
	getMovieInfo
}
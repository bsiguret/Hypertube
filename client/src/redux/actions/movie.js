import m from '../services/movie';
import { userConstants } from '../constants';

const getAllGenre = () => async dispatch => {
	function request() { return { type: userConstants.GENRE_REQUEST} };
	function success(genres) { return { type: userConstants.GENRE_SUCCESS, genres} };

	dispatch(request());
	let res = await m.getAllGenre()
		.then(
			res => {
				if (res.status !== 200) {
					return res.data;
				}
				else {
					dispatch(success(res.data));
					return res;
				}
			}
		);
	return res;
}

const initMovies = () => async dispatch => {
	function request() { return { type: userConstants.INIT_MOVIES_REQUEST} };
	function success(movies) { return { type: userConstants.INIT_MOVIES_SUCCESS, movies} };

	dispatch(request());
	let res = await m.initMovies()
		.then(
			res => {
				if (res.status !== 200) {
					return res.data;
				}
				else {
					dispatch(success(res.data));
					return res;
				}
			}
		);
	return res;
}

//min_rating, max_rating, min_year, max_year, genres, order, nb
const getMovies = (min_rating, max_rating, min_year, max_year, genres, order, nb) => async dispatch => {
	function request() { return { type: userConstants.MOVIES_REQUEST} };
	function success(movies) { return { type: userConstants.MOVIES_SUCCESS, movies} };

	dispatch(request());
	let res = await m.getMovies(min_rating, max_rating, min_year, max_year, genres, order, nb)
		.then(
			res => {
				if (res.status !== 200) {
					return res.data;
				}
				else {
					dispatch(success(res.data.movies));
					return res;
				}
			}
		);
	return res;
}

//min_rating, max_rating, min_year, max_year, genres, order, nb
const getMoreMovies = (min_rating, max_rating, min_year, max_year, genres, order, nb) => async dispatch => {
	function request() { return { type: userConstants.MOVIES_MORE_REQUEST} };
	function success(movies) { return { type: userConstants.MOVIES_MORE_SUCCESS, movies} };

	dispatch(request());
	let res = await m.getMovies(min_rating, max_rating, min_year, max_year, genres, order, nb)
		.then(
			res => {
				if (res.status !== 200) {
					return res.data;
				}
				else {
					dispatch(success(res.data.movies));
					return res;
				}
			}
		);
	return res;
}

//name, min_rating, max_rating, min_year, max_year, genres, order
const addFilter = (name, min_rating, max_rating, min_year, max_year, genres, order) => async dispatch => {
	function success(filter) { return { type: userConstants.MOVIES_FILTER_SUCCESS, filter} };

	dispatch(success({filter: {name, min_rating, max_rating, min_year, max_year, genres, order}}));
}

export const movieActions = {
	getAllGenre,
	initMovies,
	getMovies,
	getMoreMovies,
	addFilter
};
import { userConstants } from '../constants';

const initialState = {
	filter: {
		name: "",
		min_rating: 0,
		max_rating: 10,
		min_year: 0,
		max_year: 9999,
		genres: "",
		order: "rating",
	}
};

export function movieReducer(state = initialState, action) {
	switch(action.type) {
		case userConstants.GENRE_REQUEST:
		return Object.assign({}, state, {
			...state,
		});
		case userConstants.GENRE_SUCCESS:
		return Object.assign({}, state, {
			...action.genres
		});
		case userConstants.INIT_MOVIES_REQUEST:
		return Object.assign({}, state, {
			...state,
			movies: []
		})
		case userConstants.INIT_MOVIES_SUCCESS:
		return Object.assign({}, state, {
			...state,
			...action.movies
		})
		case userConstants.MOVIES_MORE_REQUEST:
		return Object.assign({}, state, {
			...state,
		})
		case userConstants.MOVIES_MORE_SUCCESS:
		return Object.assign({}, state, {
			...state,
			movies: state.movies.concat(action.movies)
		})
		case userConstants.MOVIES_REQUEST:
		return Object.assign({}, state, {
			...state,
		})
		case userConstants.MOVIES_SUCCESS:
		return Object.assign({}, state, {
			...state,
			movies: [...action.movies]
		})
		case userConstants.MOVIE_INFO_REQUEST:
		return Object.assign({}, state, {
			...state,
		})
		case userConstants.MOVIE_INFO_SUCCESS:
		return Object.assign({}, state, {
			...state,
			movie: action.movie
		})
		case userConstants.MOVIES_FILTER_SUCCESS:
		console.log(action)
		return Object.assign({}, state, {
			...state,
			filter: {
				...state.filter,
				...action.filter.filter
			}
		})
		case userConstants.LOGOUT:
			return {user: {}};
		default:
			return state;
	}
}
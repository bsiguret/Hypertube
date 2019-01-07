import { userConstants } from '../constants';


export function movieReducer(state={}, action) {
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
		case userConstants.MOVIES_REQUEST:
		return Object.assign({}, state, {
			...state,
		})
		case userConstants.MOVIES_SUCCESS:
		return Object.assign({}, state, {
			...state,
			movies: state.movies.concat(action.movies)
		})
		case userConstants.LOGOUT:
			return {user: {}};
		default:
			return state;
	}
}
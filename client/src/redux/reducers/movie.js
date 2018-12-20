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
		case userConstants.LOGOUT:
			return {user: {}};
		default:
			return state;
	}
}
import { userConstants } from '../constants';


export function userReducer(state={user: {isVerified: 0, isCompleted: 0}}, action) {
	switch(action.type) {
		case userConstants.SIGNUP_PHOTO:
		return Object.assign({}, state, {
			...state,
			photo: action.photo
		});
		case userConstants.SIGNUP_REQUEST:
		return Object.assign({}, state, {
			...state
		});
		case userConstants.SIGNUP_SUCCESS:
		return Object.assign({}, state, {
			user: action.user
		});
		case userConstants.LOGOUT:
			return {user: {}};
		default:
			return state;
	}
}
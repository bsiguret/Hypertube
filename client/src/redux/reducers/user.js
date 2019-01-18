import { userConstants } from '../constants';


export function userReducer(state={user: {isVerified: 0}}, action) {
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
		case userConstants.EMAIL_VERIFICATION_REQUEST:
			return state
		case userConstants.EMAIL_VERIFICATION_SUCCESS:
			return state
		case userConstants.LOGIN_SUCCESS:
			return {
				...action.user
			};
		case userConstants.LOGOUT:
			return {user: {isVerified: 0}};
		default:
			return state;
	}
}
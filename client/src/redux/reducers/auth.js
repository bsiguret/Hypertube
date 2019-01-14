import { userConstants } from '../constants';

// const initialState = user ? { isAuth: true, user } : { isAuth: false };

export function authReducer(state = {}, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
		return {
			user: action.email
		}
		case userConstants.LOGIN_SUCCESS:
			return {
				isAuth: true,
			};
		// case userConstants.RESENDEMAIL_REQUEST:
		// 	return {
		// 		user: action.email
		// 	};
		// case userConstants.RESENDEMAIL_SUCCESS:
		// 	return {
		// 		user: action.email
		// 	};
		// case userConstants.RESETPASS_REQUEST:
		// 	return {
		// 		user: {
		// 			...action.user,
		// 			...action.username
		// 		}
		// 	};
		// case userConstants.RESETPASS_SUCCESS:
		// 	return {
		// 		...action.user,
		// 		...action.username
		// 	};
		// case userConstants.LOGOUT:
		// 	return {isAuth: false};
		default:
			return state;
	}
}
import u from '../services/user';
import { userConstants } from '../constants';

// const getUserData = (token) => async dispatch => {
// 	function request(user) { return { type: userConstants.GETUSER_REQUEST, user} };
// 	function success(user) { return { type: userConstants.GETUSER_SUCCESS, user} };

// 	dispatch(request(token));
// 	let res = await u.getUser(token)
// 		.then(
// 			res => {
// 				if (res.status === 200) {
// 					dispatch(success(res.data));
// 					return res.status;
// 				}
// 				else
// 					return res;
// 			}
// 		);
// 	return res;
// }

const signup = (user) => async dispatch => {
	function request() { return { type: userConstants.SIGNUP_REQUEST} };
	function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user} };

	console.log(user)
	dispatch(request());
	let res = await u.signup(user)
		.then(
			res => {
				if (res.status !== 200) {
					return res;
				}
				else {
					dispatch(success(res.data));
					return;
				}
			}
		);
	return res;
}

const signupPhoto = (photo) => async dispatch => {
	function success(photo) { return { type: userConstants.SIGNUP_PHOTO, photo} };
	dispatch(success(photo));
}

export const userActions = {
	// getUserData,
	signup,
	signupPhoto
};
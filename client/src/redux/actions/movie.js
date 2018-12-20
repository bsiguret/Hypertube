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
					return;
				}
			}
		);
	return res;
}

export const movieActions = {
	getAllGenre,
};
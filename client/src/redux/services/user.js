import axios from 'axios';

const signup = async (user) => {
	let formData = new FormData();
	formData.append('user', user)

	let res = await axios.post(
		'/api/signup',
		formData,
		{ headers: {
			"Content-Type": "multipart/form-data"
		}}
	)
	.then ((response) => {
		return (response)
	})
	.catch((error) => {
		return (error.response);
	})
	return res;
}

// const savePhoto = async (photo, defineAs, token) => {
// 	let formData = new FormData();
// 	formData.append('photo', photo.toString())
// 	formData.append('defineAs', defineAs)
	
// 	let res = await axios.post(
// 		'/api/profile/photos',
// 		formData,
// 		{ headers: {
// 			"Authorization": "Bearer " + token,
// 			"Content-Type": "multipart/form-data"
// 		}}
// 	)
// 	.then ((response) => {
// 		return (response)
// 	})
// 	.catch((error) => {
// 		return (error.response);
// 	})
// 	return res;
// }

export default {
	signup,
}

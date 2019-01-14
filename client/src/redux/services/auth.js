import axios from 'axios';

const login = async (email, password) => {
	let res = await axios.post(
		'/api/signin',{
		email,
		password
	})
	.then ((response) => {
		console.log(response)
		return (response)
	})
	.catch((error) => {
		console.log(error.response)
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
	login,
}

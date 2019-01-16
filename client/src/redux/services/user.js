import axios from 'axios';

const signup = async (user) => {
	let res = await axios.post(
		'/api/signup',
		user
	)
	.then ((response) => {
		console.log(response)
		return (response)
	})
	.catch((error) => {
		return (error.response);
	})
	return res;
}

const getUser = async () => {
	let res = await axios.get(
		'/api/checklog'
	)
	.then ((response) => {
		return (response)
	})
	.catch((error) => {
		return (error.response);
	})
	return res;
}

const verifEmail = async (username, token) => {
	let res = await axios.get(
		`/api/emailvalidation/${username}/${token}`
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
	getUser,
	verifEmail
}


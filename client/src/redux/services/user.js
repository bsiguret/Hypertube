import axios from 'axios';

const signup = async (user) => {
	
	let formData = new FormData();
	formData.append("photo", user.user.photo)
	formData.append("username", user.user.username)
	formData.append("email", user.user.email)
	formData.append("firstname", user.user.firstname)
	formData.append("lastname", user.user.lastname)
	formData.append("password", user.user.password)
	formData.append("cpassword", user.user.cpassword)

	let res = await axios.post(
		'/api/signup',
		formData,
		{ headers: { "Content-Type": "multipart/form-data" } }
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


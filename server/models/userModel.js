const connection = require('../db/db').connection_db;

const findOne = (userObj) => {
	const id = userObj.id ? userObj.id : null
	const username = userObj.username ? userObj.username : null
	const email = userObj.email ? userObj.email : null
	const id42 = userObj.id42 ? userObj.id42 : null
	const facebookid = userObj.facebookid ? userObj.facebookid : null
	const googleid = userObj.googleid ? userObj.googleid : null

	const sql = 'SELECT * FROM User WHERE id = ? OR username = ? OR email = ? OR id42 = ? OR facebookid = ? OR googleid = ?'

	return new Promise((resolve, reject) => {
		connection.query(sql, [id, username, email, id42, facebookid, googleid], async (err, user) => {
			if (err) {
				reject(err)
			}
			if (!user[0]) {
				resolve(null)                    
			} else {

				resolve(user[0])
			}
		})    
	})
}

const findOrCreate = async (userObj) => {
	const sql = 'INSERT INTO users (lastname,firstname,username,email,password,profile,isVerified,id42,googleid,facebookid) VALUES(?)'
	const userData = [
		userObj.lastname,
		userObj.firstname, 
		userObj.username,
		userObj.email,
		null,
		userObj.profile,
		1,
		userObj.id42 ? userObj.id42 : null,
		userObj.googleid ? userObj.googleid : null,
		userObj.facebookid ? userObj.facebookid : null
	]
	let user = await findOne(userObj)
	if (user[0])
		return user[0]
	else {
		return new Promise((resolve, reject) => {
			return connection.query(sql, userData, (err, user) => {
				(err) ? reject(err) : resolve(user)
			})
		})
	}
}

module.exports = {
	findOne,
	findOrCreate
}

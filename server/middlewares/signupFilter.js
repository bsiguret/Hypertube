'use strict'

const bcrypt = require('bcryptjs')
const db = require('../db/db').connection_db
const sql = require('../db/requetes')

const {purifyString, isValidString, isValidEmail, isValidPassword} = require('../tools/utils')

const signupFilter = (req, res, next) => {
    console.log(req.body.user)
    db.query(sql.get_user, [null, req.body.user.username, null], (_err, usernameExist) => {
        db.query(sql.get_user, [null, null, req.body.user.email], async (err_, emailExist) => {
            if (_err || err_) {
                res.status(403).json("ERR_MIDDLW_SIGNUP")
            } else {
                req.body.user.error = {}

                if (!isValidString(req.body.user.lastname)) {
                    req.body.user.error.lastname = "Lastname must contains only letters, 2-20 characters"
                } else {
                    req.body.user.lastname = purifyString(req.body.user.lastname)
                }

                if (!isValidString(req.body.user.firstname)) {
                    req.body.user.error.firstname = "Firstname must contains only letters, 2-20 characters"
                } else {
                    req.body.user.firstname = purifyString(req.body.user.firstname)
                }

                if (usernameExist[0] && usernameExist[0].username) {
                    req.body.user.error.username = "Username unavailable"
                } else {
                    if (!isValidString(req.body.user.username, true)) {
                        req.body.user.error.username = "Username can contains letters, digits, dot, dash and underscore, 2-30 characters"
                    } else {
                        req.body.user.username = purifyString(req.body.user.username)
                    }
                }

                if (req.body.user.password === req.body.user.cpassword) {
                    if (!isValidPassword(req.body.user.password)) {
                        req.body.user.error.password = "Password must contains at least 6 characters, one uppercase and lowercase letter and one digit, only letters and digits are allowed"
                    } else {
                        req.body.user.password = purifyString(req.body.user.password, false)
                        req.body.user.password = await bcrypt.hash(req.body.user.password, 10)
                        delete req.body.user.cpassword
                    }
                } else {
                    req.body.user.error.password = "Password does not match with password confirmation"
                }

                if (emailExist[0] && emailExist[0].email) {
                    req.body.user.error.email = "Email unavailable"    
                } else {
                    if (!isValidEmail(req.body.user.email)) {
                        req.body.user.error.email = "Not a valid email, example: stream@hypertube.com"
                    } else {
                        req.body.user.email = purifyString(req.body.user.email)
                    }
                }

                if (Object.values(req.body.user.error).length) {
                    res.status(403).json(req.body.user.error)
                } else {
                    delete req.body.user.error
                    next()
                }
            }
        });    
    });
};

module.exports = signupFilter;
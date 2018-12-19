'use strict'

const bcrypt = require('bcryptjs')
const db = require('../db/db').connection_db
const sql = require('../db/requetes')

const {purifyString, isValidString, isValidEmail, isValidPassword} = require('../public/tools/utils')

const signupFilter = (req, res, next) => {
    db.query(sql.get_user, [null, req.body.username, null], (_err, usernameExist) => {
        db.query(sql.get_user, [null, null, req.body.email], async (err_, emailExist) => {
            if (_err || err_) {
                res.status(401).json("ERR_MIDDLW_SIGNUP")
            } else {
                req.body.error = {}

                if (!isValidString(req.body.lastname)) {
                    req.body.error.lastname = "Lastname must contains only letters, 2-20 characters"
                } else {
                    req.body.lastname = purifyString(req.body.lastname)
                }

                if (!isValidString(req.body.firstname)) {
                    req.body.error.firstname = "Firstname must contains only letters, 2-20 characters"
                } else {
                    req.body.firstname = purifyString(req.body.firstname)
                }

                if (usernameExist[0] && usernameExist[0].username) {
                    req.body.error.username = "Username unavailable"
                } else {
                    if (!isValidString(req.body.username, true)) {
                        req.body.error.username = "Username can contains letters, digits, dot, dash and underscore, 2-30 characters"
                    } else {
                        req.body.username = purifyString(req.body.username)
                    }
                }

                if (req.body.password === req.body.cpassword) {
                    if (!isValidPassword(req.body.password)) {
                        req.body.error.password = "Password must contains at least 6 characters, one uppercase and lowercase letter and one digit, only letters and digits are allowed"
                    } else {
                        req.body.password = purifyString(req.body.password, false)
                        req.body.password = await bcrypt.hash(req.body.password, 10)
                        delete req.body.cpassword
                    }
                } else {
                    req.body.error.password = "Password does not match with password confirmation"
                }

                if (emailExist[0] && emailExist[0].email) {
                    req.body.error.email = "Email unavailable"    
                } else {
                    if (!isValidEmail(req.body.email)) {
                        req.body.error.email = "Not a valid email, example: stream@hypertube.com"
                    } else {
                        req.body.email = purifyString(req.body.email)
                    }
                }

                if (Object.values(req.body.error).length) {
                    res.status(401).json(req.body.error)
                } else {
                    delete req.body.error
                    next()
                }
            }
        });    
    });
};

module.exports = signupFilter;
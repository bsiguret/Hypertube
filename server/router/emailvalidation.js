'use strict'

const express = require('express');
const router = express.Router();
let db = require('../db/db').connection_db
let sql = require('../db/requetes')

router.get('/:username/:token', (req, res) => {
    console.log(req.params.username)
    let username = decodeURIComponent(req.params.username)
    db.query(sql.get_user, [null, username, null], (err, user) => {
        if (err) {
            res.status(403).json({msg: err.code + ': ' + err.sqlMessage})
        }
        if (user.length && user[0].token === req.params.token) {
            db.query("UPDATE users SET ? WHERE username=?", [{token: null, isVerified: 1}, username], (err, success) => {
                if (err) {
                    res.status(403).json("ERR_VALIDATION_TOKEN")
                } else {
                    res.json("Congrats "+ username + " ! your account is validated")
                }
            })
        } else {
            res.status(403).json("Invalid token")
        }
    })
});

module.exports = router
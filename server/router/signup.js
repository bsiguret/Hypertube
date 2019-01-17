'use strict'

const express = require('express');
const router = express.Router();
const fs = require('fs');

let db = require('../db/db').connection_db
let sql = require('../db/requetes')
let signupFilter = require('../middlewares/signupFilter')
let {sendMailTo} = require('../tools/sendMailTo')

router.post('/', signupFilter, (req, res) => {
    const dir = __dirname + '/../public/'
    const userStorage =  encodeURIComponent(req.body.username) + '/'
    const filename = userStorage + 'profile.png'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    if (!fs.existsSync(dir + userStorage)) {
        fs.mkdirSync(dir + userStorage)
    }

    fs.writeFile(dir + filename, req.body.photo, {encoding: 'base64'}, function(err) {

    });

    let data = [
        req.body.lastname,
        req.body.firstname,
        req.body.username,
        req.body.password,
        req.body.email,
        "http://localhost:" + process.env.PORT_BACK + "/api/photo/" + filename
    ]
    
    db.query(sql.insert_user, [data], (err, success) => {
        if (err) {
            return res.status(403).json({error: err.code + ': ' + err.sqlMessage})
        }
        sendMailTo(req.body.username, req.body.email, 1).then(success => {
            res.json(success)
        }).catch(err => {
            res.status(403).json({sendMail: err})
        })
    });
});

module.exports = router;
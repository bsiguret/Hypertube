'use strict'

const express = require('express');
const router = express.Router();

let db = require('../db/db').connection_db
let sql = require('../db/requetes')
let signupFilter = require('../middlewares/signupFilter')
let {sendMailTo} = require('../public/tools/sendMailTo')

router.post('/', signupFilter, (req, res) => {
    db.query(sql.insert_user, [Object.values(req.body)], (err, success) => {
        if (err) {
            return res.status(401).json({msg: err.code + ': ' + err.sqlMessage})
        }
        sendMailTo(req.body.username, req.body.email, 1).then(success => {
            res.json(success)
        }).catch(err => {
            res.status(401).json({sendMail: err})
        })
    });
});

module.exports = router;
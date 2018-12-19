'use strict'

const express = require('express');
const router = express.Router();

let db = require('../db/db').connection_db
let sql = require('../db/requetes')
let signupFilter = require('../middlewares/signupFilter')

router.post('/', signupFilter, (req, res) => {
    db.query(sql.insert_user, [Object.values(req.body)], (err, success) => {
        if (err) {
            return res.status(401).json({msg: err.code + ': ' + err.sqlMessage})
        }
        res.json({msg: req.body.username + " created"})
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();

let db = require('../db/db').connection_db;
let sql = require('../db/requetes');

router.post('/', (req, res) => {
    db.query(sql.get_user, [[req.body.email]], (err, success) => {
        if (err) {
            return res.status(401).json({msg: err.code + ': ' + err.sqlMessage})
        }
        if (success.length && success[0].password == req.body.password)
            res.json({msg: "OK"});
        else
            res.status(401).json({msg: "L'email ou password incorrect"});
    });
});

module.exports = router;
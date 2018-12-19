const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const db = require('../db/db').connection_db;
const sql = require('../db/requetes');

router.post('/', (req, res) => {
    db.query(sql.get_user, [null, null, req.body.email], async (err, success) => {
        if (err) {
            return res.status(401).json({msg: err.code + ': ' + err.sqlMessage})
        }
        let password = await bcrypt.hash(req.body.password, 10);
        console.log(password);
        if (success.length && success[0].password == password)
            res.json({msg: "OK"});
        else
            res.status(401).json({msg: "L'email ou password incorrect"});
    });
});

module.exports = router;
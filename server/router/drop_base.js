var db = require('../db/db');
var sql = require('../db/requetes');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    db.connection.query(sql.drop_database, function(err, res) {
        if (err)
            console.log("DROP DATABASE ERROR: ", err.message);
        else
            console.log("DROP DATABSE SUCCESS!");
    });
});

module.exports = router;
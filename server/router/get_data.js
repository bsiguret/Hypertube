var db = require('../db/db');
var sql = require('../db/requetes');
const express = require('express');
const router = express.Router();

router.get('/all_genre', (req, res) => {
    db.connection_db.query(sql.get_all_genre, (err, rows) => {
        if (err)
            res.status(403).json({msg: "Error get all genre"});
        res.json({genres: rows});
    });
});

router.get('/all_movies', (req, res) => {
    db.connection_db.query(sql.get_all_movies_by_rating, (err, rows) => {
        if (err)
            res.status(403).json({msg: "Error get all genre"});
        res.json({movies: rows});
    });
});

module.exports = router;
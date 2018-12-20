var db = require('../db/db');
var sql = require('../db/requetes');
const express = require('express');
const router = express.Router();

router.get('/all_genre', (req, res) => {
    db.connection_db.query(sql.get_all_genre, (err, rows) => {
        if (err)
            res.json({msg: "Error get all genre"});
        res.json({genres: rows});
    });
});

router.get('/all_movies', (req, res) => {
    db.connection_db.query(sql.get_all_movies_by_rating, (err, rows) => {
        if (err)
            res.json({msg: "Error get movies"});
        res.json({movies: rows});
    });
});

router.post('/all_movies/:nb', (req, res) => {
    var where = "ifNULL(movies.rating, 0) >= " + req.body.min_rating + " AND ifNULL(movies.rating, 0) <= " + req.body.max_rating;
    where += " AND movies.year >= " + req.body.min_year + " AND movies.year <= " + req.body.max_year;
    for (let i = 0; i < req.body.genres.length; i++) {
        where += " AND b.genres LIKE '%" + req.body.genres[i] + "%'";
    }
    var get_all_movies_by_filtre = "SELECT movies.*, b.genres FROM movies INNER JOIN (SELECT movie_id, group_concat(genre) AS genres FROM genre GROUP BY movie_id) b ON movies.movie_id = b.movie_id WHERE " + where + " ORDER BY " + req.body.order + " LIMIT 20 OFFSET " + req.params.nb * 20;
    db.connection_db.query(get_all_movies_by_filtre, (err, rows) => {
        if (err)
            res.json({msg: "Error get movies"});
        res.json({movies: rows});
    });
});

module.exports = router;
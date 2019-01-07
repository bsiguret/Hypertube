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

/*
requete need:
min_rating, max_rating, min_year, max_year, genres, order, nb
*/
router.post('/all_movies/:nb', (req, res) => {
    console.log(req.body)
    var where = "ifNULL(movies.rating, 0) >= " + req.body.min_rating + " AND ifNULL(movies.rating, 0) <= " + req.body.max_rating;
    where += " AND movies.year >= " + req.body.min_year + " AND movies.year <= " + req.body.max_year;
    if (req.body.name)
        where += " AND movies.title LIKE '%" + req.body.name + "%'";
    if (req.body.genres)
        where += " AND b.genres LIKE '%" + req.body.genres + "%'";
    var get_all_movies_by_filtre = "SELECT movies.*, b.genres FROM movies INNER JOIN (SELECT movie_id, group_concat(genre) AS genres FROM genre GROUP BY movie_id) b ON movies.movie_id = b.movie_id WHERE " + where + " ORDER BY " + req.body.order + " DESC LIMIT 20 OFFSET " + req.params.nb * 20;
    db.connection_db.query(get_all_movies_by_filtre, (err, rows) => {
        if (err)
            res.json({msg: "Error get movies"});
        else
            res.json({movies: rows});
    });
});

router.get('/movie/:movie_id', (req, res) => {
    db.connection_db.query(sql.get_movie, [req.params.movie_id], (err, rows) => {
        if (err)
            res.json({msg: "Error get info"});
        else {
            db.connection_db.query(sql.get_movie_genre, [req.params.movie_id], (err1, rows1) => {
                if (err1)
                    res.json({msg: "Error get info"});
                else
                    res.json({info: rows, genres: rows1});
            })
        }
    })
});

module.exports = router;
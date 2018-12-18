const express = require('express');
const router = express.Router();
const mydb = require('../../db/db');
const sql = require('../../db/requetes');
const axios = require('axios');

router.get('/', (req, res) => {
	mydb.connection_db.query(sql.get_all_movies_by_rating, function(err, rows) {
		if (err) {
			console.log(err);
			return ;
		}
		res.render('./pages/library', {
			movies: rows
		});
	});
});

module.exports = router;
const fs = require('fs');
const sql = require('../db/requetes');
const db = require('../db/db');

// Sauvegarder les films sous format json dans une variable
var filename = __dirname + "/movies.json";
var content = fs.readFileSync(filename, 'utf-8');
if (content.slice(-1) == ",")
	content = content.substr(0, content.length - 1) + "]";
var movies = JSON.parse(content);
// console.log(movies.length);

// Sauvegarder les films dans la base
for (let i = 0; i < movies.length; i++) {
	try {
		db.connection_db.query(sql.add_movie, [[movies[i].movie]], function(err, rows) {
			if (err)
				console.log(err);
			else {
				if (movies[i].genre.length) {
					db.connection_db.query(sql.add_movie_genre, [movies[i].genre], function(err, rows) {
						if (err)
							console.log(err);
					});
				}
				db.connection_db.query(sql.add_movie_torrent, [movies[i].torrent], function(err, rows) {
					if (err)
						console.log(err);
					if (i == movies.length - 1) {
						console.log("Finish");
					}
				});
			}
		});
	} catch(err) {
		console.log(err);
	}
}

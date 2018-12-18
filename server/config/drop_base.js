var db = require('../db/db');
var sql = require('../db/requetes');

db.connection.connect();

db.connection.query(sql.drop_database, function(err, res) {
	if (err)
		console.log("DROP DATABASE ERROR: ", err.message);
	else
		console.log("DROP DATABSE SUCCESS!");
});

db.connection.end();
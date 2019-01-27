var cron = require('node-cron');
const fs = require('fs');
const db = require('../db/db').connection_db;
const sql = require('../db/requetes');

function deleteAll(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteaAll(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

module.exports = () => cron.schedule('* * * * *', () => {
	db.query(sql.get_movie_file, (err, rows) => {
		if (err) {
			console.log("Error get movie file");
		} else if (rows.length > 0) {
			console.log(rows);
			// deleteAll();
        }
    })
});
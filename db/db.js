const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "password"
});

var connection_db = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "password",
    database : "hypertube"
});

module.exports = {
    connection: connection,
    connection_db: connection_db
};
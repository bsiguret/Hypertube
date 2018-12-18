var db = require('../db/db');
var sql = require('../db/requetes');

db.connection.connect();

db.connection.query(sql.create_database, function(err, res) {
    if (err) {
        console.log("CREATE DATABASE ERROR: ", err.message);
        return ;
    }
    console.log("CREATE DATABASE SUCCESS!");
    db.connection_db.connect();
    db.connection_db.query(sql.create_table_movies, function(err1, res1) {
        if (err)
            console.log("CREATE TABLE MOVIES ERROR: ", err1.message);
        else
            console.log("CREATE TABLE MOVIES SUCCESS!");
    });
    db.connection_db.query(sql.create_table_movies_genre, function(err2, res2) {
        if (err)
            console.log("CREATE TABLE MOVIES GENRE ERROR: ", err2.message);
        else
            console.log("CREATE TABLE MOVIES GENRE SUCCESS!");
    });
    db.connection_db.query(sql.create_table_movies_torrent, function(err3, res2) {
        if (err)
            console.log("CREATE TABLE MOVIES TORRENT ERROR: ", err3.message);
        else
            console.log("CREATE TABLE MOVIES TORRENT SUCCESS!");
    });
    db.connection_db.query(sql.create_table_movies_file, function(err3, res2) {
        if (err)
            console.log("CREATE TABLE MOVIES FILE ERROR: ", err3.message);
        else
            console.log("CREATE TABLE MOVIES FILE SUCCESS!");
    });
    db.connection_db.query(sql.create_table_movies_subtitle, function(err3, res2) {
        if (err)
            console.log("CREATE TABLE MOVIES SUBTITLE ERROR: ", err3.message);
        else
            console.log("CREATE TABLE MOVIES SUBTITLE SUCCESS!");
    });
    db.connection_db.end();
});

db.connection.end();